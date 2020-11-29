import React from 'react';
import Header from './Header.js';
import SearchBar from './SearchBar.js';
import ScriptList from './ScriptList.js';
import { useLocation } from "react-router-dom";
import RequestInterface from '../interfaces/RequestInterface';
import { ScriptTileList, ScriptEntryListWaiting } from './ScriptList';


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
    let search_box = document.getElementById('monkey-search-box');
    search_box.addEventListener("change", this.processQuery.bind(this));

    if (!this.state.query || this.state.query == "" || this.state.query === null || this.state.query === "null") return;
    search_box.value = this.state.query;
    this.processQuery();
  }

  processQuery(e) { 
    if (e) {
      e.preventDefault();
      if (e.target.value == '') return;

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
      <>
      <Header 
        title="Search"
        subtitle="Find the perfect script!"
        supplement= { <SearchBar /> }
        />
      <div className="container section">
        <UserScriptList script_results = { this.state.script_results } title="Search Results" />
        <ScriptList listType="recommended" numScripts="4" title="Other Recommended Scripts"/>
      </div>
      </>
    )
  }

}

function UserScriptList(props) {
  let script_entries = "I'm sorry, I couldn't find anything for your search term yet! Let's try something different.";
    if (props.script_results && props.script_results.length > 0) {
      script_entries = <ScriptTileList scripts={ props.script_results } />;
    }
  return (
    <div>
      <h1>Search Results</h1>
      { script_entries }
    </div>
  )
}