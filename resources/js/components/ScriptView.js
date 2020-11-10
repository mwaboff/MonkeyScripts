import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,

} from "react-router-dom";
import RequestInterface from '../interfaces/RequestInterface';

function ScriptView() {
  // Have to do this functional wrapper as useParams "hook" can't be run in a class based component apparently
  let { id } = useParams();
  return (
    <ScriptViewMain id={ id } />
  )
}
class ScriptViewMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      requested_id: props.id, 
      script_id: "-1", 
      script_author: "Loading...", 
      script_title: "Loading...", 
      script_summary: "Loading...", 
      script_descr: "Loading...", 
      script_code: "Loading..." 
    };
  }

  componentDidMount() {
    this.fetchScriptList().then(response => 
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

  async fetchScriptList() {
    const rec_url = "/api/script/show?id=" + this.state.requested_id;
    return RequestInterface.sendRequest(rec_url);
  }

  render() {
    return (
      <div className="container" readOnly>
        <ScriptTitle script_title = { this.state.script_title }/>
        <ScriptAuthor script_author = { this.state.script_author }/>
        <ScriptSummary script_summary = { this.state.script_summary } />
        <ScriptDescription script_descr = { this.state.script_descr } />
        <ScriptInstallButton script_id = { this.state.script_id } />
        <ScriptCode script_code = { this.state.script_code } />
      </div>
    )
  }

}

export default ScriptView;

function ScriptTitle(props) {
  return (
    <div>
      { props.script_title }
    </div>
  );
}

function ScriptAuthor(props) {
  return (
    <div>
      { props.script_author }
    </div>
  )
}

function ScriptSummary(props) {
  return (
    <div>
      { props.script_summary }
    </div>
  )
}

function ScriptDescription(props) {
  return (
    <div>
      { props.script_descr }
    </div>
  )
}

function ScriptCode(props) {
  return (
    <div>
      <textarea className="form-control" value={ props.script_code } style={{height: 500 + "px"}} readOnly/>
    </div>
  )
}

function ScriptInstallButton(props) {
  let install_url = "/script/" + props.script_id + ".user.js";
  return (
    <a href={install_url} className="btn btn-primary">Install</a>
  )
}