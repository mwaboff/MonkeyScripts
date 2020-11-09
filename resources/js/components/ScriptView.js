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
  let { id } = useParams();
  return (
    <ScriptViewMain id={ id } />
  )
}
class ScriptViewMain extends React.Component {

  constructor(props) {
    super(props);
    // let { id } = useParams();
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
    const rec_url = "/api/script?id=" + this.state.requested_id;
    return RequestInterface.sendRequest(rec_url);
  }

  render() {
    // let script_entries = <ScriptEntryListWaiting />
    // if (this.state.response.length) {
    //   script_entries = <ScriptEntryList scripts={this.state.response} />;
    // }

    return (
      <div className="col-md-6">
        <ScriptTitle script_title = { this.state.script_title }/>
        <ScriptAuthor script_author = { this.state.script_author }/>
        <ScriptSummary script_summary = { this.state.script_summary } />
        <ScriptDescription script_descr = { this.state.script_descr } />
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
      { props.code }
    </div>
  )
}