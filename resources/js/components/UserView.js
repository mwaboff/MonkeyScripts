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
import { ScriptEntryList, ScriptEntryListWaiting } from './ScriptList';

export default function UserView() {
  // Have to do this functional wrapper as useParams "hook" can't be run in a class based component apparently
  let { id } = useParams();
  return (
    <UserViewMain id={ id } />
  )
}

class UserViewMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      requested_id: props.id, 
      user_name: "Loading...", 
      user_info: {
        join_date: "Loading...",
        num_scripts: "Loading...",
      },
      user_scripts: []
    };
  }

  componentDidMount() {
    this.fetchScriptInfo()
      .then(response => 
        this.setState({
          user_name: response["name"],
          user_info: {
            join_date: response["join_date"],
            num_scripts: response["num_scripts"]
          },
          user_scripts: response["script_list"]
        })
      )
  }

  async fetchScriptInfo() {
    const rec_url = "/api/user/info?id=" + this.state.requested_id;
    return RequestInterface.sendRequest(rec_url);
  }

  render() {
    return (
      <div>
        <UserName name={ this.state.user_name } />
        <UserInfo info={ this.state.user_info } />
        <UserScriptList script_list={ this.state.user_scripts } />
      </div>
    )
  }
}

function UserName(props) {
  return (
    <div>
      <h1>
        { props.name }
      </h1>
    </div>
  )
}

function UserInfo(props) {
  return (
    <div>
      <b>Member Since:</b> { props.info.join_date }
      <b>Number of Scripts:</b> { props.info.num_scripts }
    </div>
  )
}

function UserScriptList(props) {
  let script_entries = <ScriptEntryListWaiting />
  if (props.script_list.length) {
    script_entries = <ScriptEntryList scripts={ props.script_list } />;
  }
  return (
    <div>
      { script_entries }
    </div>
  )
}