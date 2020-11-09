import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import RequestInterface from '../interfaces/RequestInterface';



class ScriptList extends React.Component {


  constructor(props) {
    super(props);
    this.state = { list_type: props.listType, num_scripts: props.numScripts, response: [] };
  }

  componentDidMount() {
    this.fetchScriptList().then(script_list => 
      this.setState({response: script_list})
    );

  }

  async fetchScriptList() {
    const rec_url = "/api/script/recommend/?type=" + this.state.list_type + "&count=" + this.state.num_scripts;
    return RequestInterface.sendRequest(rec_url);
  }

  render() {
    let script_entries = <ScriptEntryListWaiting />
    if (this.state.response.length) {
      script_entries = <ScriptEntryList scripts={this.state.response} />;
    }

    return (
      <div className="col-md-6">
        <ScriptListTitle list_type={this.state.list_type} />
        {script_entries}
      </div>
    )
  }

}

export default ScriptList;

function ScriptEntryList(props) {
  return (
    <ul className="script-list">

    {
      props.scripts.map((script) => 
        <li key={script.id} className="script-entry card"><ScriptEntry script={script} /></li>
      )
    }
    </ul>
  )
}

function ScriptEntryListWaiting() {
  return (
    <ul className="script-list">
      <li key="1" className="card">Loading...</li>
    </ul>
  )
}

class ScriptListTitle extends React.Component {
  constructor(props) {
    super(props);
    this.LIST_TYPES = {
      "topdownload": "Top Download", 
      "toprated": "Top Rated",
      "recent": "Recently Updated",
      "choice" : "Editor's Choice"
    };
  
    this.state = {title: this.LIST_TYPES[props.list_type]};
  }

  render() {
    return (
    <div className="script-list-title">{ this.state.title }</div>
    )
  }
}


function ScriptEntry(props) {
  return (
    <Link to={"script/" + props.script.id } className="card">
      <div className="card-body">
        <b> { props.script.title } </b> - { props.script.description }
      </div>
    </Link>
  )
}