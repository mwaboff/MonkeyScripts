import React from 'react';
import { ScriptTileList, ScriptEntryListWaiting } from './ScriptList';
import RequestInterface from '../interfaces/RequestInterface';
import { useLocation } from "react-router-dom";
import ScriptList from './ScriptList.js';
import SearchBar from './SearchBar.js';


export default function SearchView() {
  // Have to do this functional wrapper as useParams "hook" can't be run in a class based component apparently
  let query = useQuery()
  let search_string = query.get("q");
  return (
    <SearchViewMain query={ search_string } />
  )
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

class SearchViewMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      query: decodeURIComponent(props.query),
      script_results: [],
      user_results: []
    };
  }

  componentDidMount() {
    if (this.state.query === "null") return;

    let search_box = document.getElementById('monkey-search-box');
    search_box.value = this.state.query;

    this.processQuery();
    search_box.addEventListener("change", this.processQuery.bind(this));

    
  }

  processQuery(e) {
    if (e) {
      e.preventDefault();
      if (e.target.value) {
        this.setState({
          query: e.target.value
        })
      }
    }
    
    this.fetchResults().then(response => 
      this.setState({
        script_results: response["script_results"],
        user_results: response["user_results"]
      })
    );

  }

  async fetchResults() {
    const search_url = "/api/search";
    const search_data = {
      "query": this.state.query
    }
    return RequestInterface.sendRequest(search_url, "POST", search_data);
  }

  render() {

    return (
      <div className="container" readOnly>
        <SearchBar />
        <UserScriptList script_results = { this.state.script_results } />
        <ScriptList listType="recommended" numScripts="6" />
      </div>
    )
  }

}

function UserScriptList(props) {
  let script_entries = <ScriptEntryListWaiting />;
    if (props.script_results) {
      script_entries = <ScriptTileList scripts={ props.script_results } />;
    }
  return (
    <div>
      { script_entries }
    </div>
  )
}