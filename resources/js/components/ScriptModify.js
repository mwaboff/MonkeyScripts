import React from 'react';
import ReactDOM from 'react-dom';
import RequestInterface from '../interfaces/RequestInterface';

import {
  Redirect,
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

function ScriptModify() {
  // Have to do this functional wrapper as useParams "hook" can't be run in a class based component apparently
  let { id } = useParams();
  if (id) {
    return (
      <ScriptModifyMain id={ id } />
    )
  } else {
    return (
      <ScriptModifyMain />
    )
  }
}

class ScriptModifyMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      requested_id: props.id,
      script_id: -1,
      script_title: "",
      script_summary: "",
      script_desc: "",
      script_code: "",
    };

  }


  getScriptInfo(script_id) {
    let rec_url = "/api/script/show?id=" + this.state.requested_id;
    return RequestInterface.sendRequest(rec_url);

  }

  componentDidMount() {
    let login_form = document.getElementById('script-form');
    login_form.addEventListener('submit', this.submitScript.bind(this));

    let delete_form = document.getElementById('script-delete');
    delete_form.addEventListener('submit', this.deleteScript.bind(this));

    if (this.state.requested_id) {
      this.fetchScriptInfo().then(response => 
        this.setState({
          script_id: response["id"],
          script_title: response["title"],
          script_author: response["author_id"],
          script_summary: "???",
          script_descr: response["description"],
          script_code: response["code"]
        })
      );
    }
    

  }

  async fetchScriptInfo() {
    const rec_url = "/api/script/show?id=" + this.state.requested_id;
    return RequestInterface.sendRequest(rec_url);
  }

  submitScript(e) {
    e.preventDefault();
    let form = e.srcElement;
    let script_data = {
      script_id: this.state.script_id ? this.state.script_id : "",
      title: form["script-title"].value,
      summary: form["script-summary"].value,
      description: form["script-descr"].value,
      code: form["script-code"].value
    };

    let target_address = "/api/script/new";
    if(this.state.script_id >= 0) {
      target_address = "/api/script/edit";
    }

    RequestInterface.sendRequest(target_address, "POST", script_data)
      .then(response => this.redirectToScript(response));
  }

  deleteScript(e) {
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this script?")) {
      return;
    }

    let target_address = "/api/script/destroy";
    let script_data = { "script_id": this.state.script_id }

    RequestInterface.sendRequest(target_address, "POST", script_data)
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
        <PageTitle id={this.state.requested_id}/>
        <ScriptForm script_info={ this.state }/>
        <ScriptDestroyButton />
      </div>
      
    )
  }
}

export default ScriptModify;

function PageTitle(props) {
  return (
    <h1>{ props.id ? "Edit Script": "Create Script"}</h1>
  )
}

function ScriptForm(props) {
  return (
    <form id="script-form" action="api/script/new" method="POST">
      <label htmlFor="script-title">Title</label>
      <input type="text" name="script-title" className="form-control" defaultValue={ props.script_info.script_title }></input>
      <label htmlFor="script-summary">Brief Summary</label>
      <input type="text" name="script-summary" className="form-control" defaultValue={ props.script_info.script_summary }></input>
      <label htmlFor="script-desc">Description</label>
      <textarea type="text" name="script-descr" className="form-control" style={{ height: 200 + "px" }} defaultValue={ props.script_info.script_descr }></textarea>
      <label htmlFor="script-code">Code</label>
      <textarea name="script-code" className="form-control" style={{height: 500 + "px"}} defaultValue={ props.script_info.script_code }></textarea>
      <input type="submit" className="btn btn-primary" value="Submit" />
    </form>
  )

}

function ScriptDestroyButton(props) {
  let destroy_url = "/script/destroy";

  return (
    <form id="script-delete" action="api/script/destroy" method="POST">
      <input type="submit" className="btn" value="Delete" />
    </form>
  )
}