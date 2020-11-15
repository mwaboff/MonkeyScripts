import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,
  useLocation

} from "react-router-dom";
import RequestInterface from '../interfaces/RequestInterface';
import { ScriptEntryList, ScriptEntryListWaiting } from './ScriptList';
import Search from './Search.js';


export default function SearchView() {
  // Have to do this functional wrapper as useParams "hook" can't be run in a class based component apparently
  let query = useQuery()
  let search_string = query.get("q");
  console.log("search string: " + search_string);
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
    console.log("fetching results for this query: " + this.state.query);
    const search_url = "/api/search";
    const search_data = {
      "query": this.state.query
    }
    return RequestInterface.sendRequest(search_url, "POST", search_data);
  }

  render() {

    return (
      <div className="container" readOnly>
        <Search />
        <UserScriptList script_results = { this.state.script_results } />
      </div>
    )
  }

}

function UserScriptList(props) {
  let script_entries = <ScriptEntryListWaiting />;
    if (props.script_results) {
      script_entries = <ScriptEntryList scripts={ props.script_results } />;
    }
  return (
    <div>
      { script_entries }
    </div>
  )
}