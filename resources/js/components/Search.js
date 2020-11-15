import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

function Search(props) {
  const browser_history = useHistory();
  return (
    <SearchMain history={ browser_history } />
  )
}

class SearchMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: props.history
    }
  }

  componentDidMount() {
    let search_form = document.getElementById('monkey-search-form');
    search_form.addEventListener('submit', this.redirectToSearch.bind(this));
  }

  redirectToSearch(e) {
    e.preventDefault();
    let current_query = document.getElementById('monkey-search-box').value;
    let query_address = "/search?q=" + encodeURIComponent(current_query);
    this.state['history'].push(query_address);
  }

  render() {
    return (
      <SearchBasicForm />
    )
  }
}

export default Search;

function SearchBasicForm(props) {
  return (
    <form id="monkey-search-form">
      <input id="monkey-search-box" type="text" name="search-text" className="form-control" placeholder="Find your next favorite script..." ></input>
      <input type="submit" className="btn btn-primary" value="Search" />
    </form>
  )
}