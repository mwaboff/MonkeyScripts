import React from 'react';
import { useHistory } from "react-router-dom";

import '../../css/SearchBar.css';

function SearchBar(props) {
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
      <div className="search-bar">
        <SearchBasicForm />
      </div>
    )
  }
}

export default SearchBar;

function SearchBasicForm(props) {
  return (
    <form id="monkey-search-form">
      <SearchIcon />
      <input id="monkey-search-box" type="text" name="search-text" className="search-bar-mks search-component" placeholder="Find your next favorite script..." ></input>
      <SearchButton />
    </form>
  );
}

function SearchIcon(props) {
  return (
    <div className="search-icon search-component"><i className="fas fa-search" /></div>
  );
}

function SearchButton(props) {
  return (
    <button type="submit" className="search-submit-btn search-component" value="->"><i className="fas fa-arrow-right" /></button>
  )
}