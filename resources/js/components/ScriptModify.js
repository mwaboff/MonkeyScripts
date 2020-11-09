import React from 'react';
import ReactDOM from 'react-dom';
import RequestInterface from '../interfaces/RequestInterface';

import {
  Redirect
} from "react-router-dom";

// import ScriptList from './ScriptList.js';

class ScriptModify extends React.Component {

  componentDidMount() {
    let login_form = document.getElementById('script-form');
    login_form.addEventListener('submit', this.submitScript.bind(this));
  }

  submitScript(e) {
    e.preventDefault();
    let form = e.srcElement;
    let script_data = {
      title: form["script-title"].value,
      summary: form["script-summary"].value,
      description: form["script-descr"].value,
      code: form["script-code"].value
    };

    RequestInterface.sendRequest("/api/script/new", "POST", script_data)
      .then(response => this.redirectToScript(response));
  }

  redirectToScript(response) {
    let script_id = response["id"];
    return (
      <Redirect to={ "/script/" + script_id } />
    )
  }

  render(props) {
    return (
      <div className="container">
        <PageTitle />
        <ScriptForm />
      </div>
      
    )
  }
}

export default ScriptModify;

function PageTitle(props) {
  return (
    <h1>Create Script</h1>
  )
}

function ScriptForm() {
  return (
    <form id="script-form" action="api/script/new" method="POST">
      <label htmlFor="script-title">Title</label>
      <input type="text" name="script-title" className="form-control"></input>
      <label htmlFor="script-desc">Brief Summary</label>
      <input type="text" name="script-summary" className="form-control"></input>
      <label htmlFor="script-desc">Description</label>
      <textarea type="text" name="script-descr" className="form-control" style={{ height: 200 + "px" }}></textarea>
      <label htmlFor="script-code">Code</label>
      <textarea name="script-code" className="form-control" style={{height: 500 + "px"}}></textarea>
      <input type="submit" className="btn btn-primary" value="Submit" />
      
    </form>
  )

}