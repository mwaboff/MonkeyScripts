import React from 'react';
import Header from './Header.js';
import { useParams } from "react-router-dom";
import RequestInterface from '../interfaces/RequestInterface';
import { ScriptTileList } from './ScriptList';
import '../../css/UserView.css';

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
      join_date: "Loading...",
      num_scripts: "Loading...",
      user_scripts: []
    };
  }

  componentDidMount() {
    this.fetchScriptInfo()
      .then(response => 
        this.setState({
          user_name: response["name"],
          join_date: response["join_date"],
          num_scripts: response["num_scripts"],
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
      <>
      <Header 
        title={this.state.user_name}
        subtitle="User"
      />
      <div className="container section">
        <UserScriptList script_list={ this.state.user_scripts } />
      </div>
      </>
    )
  }
}

function UserInfo(props) {
  return (
    <div className="col-md-3">
      <b>Member Since:</b> { props.join_date }
      <b>Number of Scripts:</b> { props.num_scripts }
    </div>
  )
}

function UserScriptList(props) {
  let script_entries = "There are no scripts here yet!";
  if (props.script_list.length) {
    script_entries = <ScriptTileList scripts={ props.script_list } />;
  }
  return (
    <div className="user-view-content">
      <h1>Submitted Scripts</h1>
      { script_entries }
    </div>
  )
}