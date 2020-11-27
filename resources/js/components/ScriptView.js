import React from 'react';
import { Link, useParams } from "react-router-dom";

import RequestInterface from '../interfaces/RequestInterface';
import UserContext from '../contexts/UserContext.js';
import ScriptViewLinks from './ScriptViewLinks.js';
import ScriptList from './ScriptList.js';
import Header from './Header.js';

import '../../css/ScriptView.css';



export default function ScriptView() {
  // Have to do this functional wrapper as useParams "hook" can't be run in a class based component apparently
  let { id, display } = useParams();
  console.log(display);
  return (
    <ScriptViewMain id={ id } display={ display }/>
  )
}

class ScriptViewMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      display: props.display,
      requested_id: props.id, 
      script_id: "-1", 
      author_id: "Loading...", 
      script_title: "Loading...", 
      script_summary: "Loading...", 
      script_descr: "Loading...", 
      script_code: "Loading...",
      author_name: "Loading...", 
      create_date: "Loading...",
      update_date: "Loading...",
      downloads: "Loading..."
    };
  }

  componentDidMount() {
    let install_button = document.getElementById('install-button');
    install_button.addEventListener('click', this.sendClickedDownload.bind(this));
    this.initiateScriptFetch(this.state.requested_id);
  }

  componentDidUpdate() {
    if (this.props.id !== this.state.requested_id) {
      this.setState({requested_id: this.props.id});
      this.initiateScriptFetch(this.props.id);      
    }

    if(this.props.display !== this.state.display) {
      this.setState({display: this.props.display});
    }
  }

  initiateScriptFetch(requested_id) {
    this.fetchScriptInfo(requested_id)
    .then(response => 
      this.setState({
        script_id: response["id"],
        script_title: response["title"],
        author_id: response["author_id"],
        author_name: response["author_name"],
        script_summary: response["summary"],
        script_descr: response["description"],
        script_code: response["code"],
        create_date: response["create_date"],
        update_date: response["update_date"],
        downloads: response["downloads"]
      })
    );
  }

  sendClickedDownload(e) {
    e.preventDefault();
    const req_url = "/api/script/install/" + this.state.script_id;
    RequestInterface.sendRequest(req_url, "POST");

  }

  async fetchScriptInfo(requested_id) {
    const req_url = "/api/script/show?id=" + requested_id;
    return RequestInterface.sendRequest(req_url, "POST");
  }

  render() {
    let author_link = <Link to={ "/user/" + this.state.author_id } className="header-subtitle">By { this.state.author_name }</Link>;

    let view_content = <ScriptDescription script_descr = { this.state.script_descr } />;
    if (this.state.display == "code") {
      view_content = <ScriptCode script_code = { this.state.script_code } />;
    }

    return (
      <>
      <Header 
        title={ this.state.script_title } 
        subtitle={ author_link }
        tagline={this.state.script_summary }
        tagline2={ this.state.script_descr }
        supplement={ <ScriptMetadata 
          create_date = { this.state.create_date } 
          update_date = { this.state.update_date }
          downloads = { this.state.downloads } 
        /> }
      />
      <div className="container" readOnly>
        <UserContext.Consumer>
          {(value) => (<ScriptViewLinks 
            author_id = { this.state.author_id }  
            user = { value.user } 
            script_id = { this.state.script_id } 
            display = { this.state.display }
          />)}
        </UserContext.Consumer>

        <div className="script-view-content section">
          { view_content }
        </div>

        <ScriptList listType="similar" numScripts="4" scriptId= { this.state.requested_id } title="Check out these other scripts!"/>
      </div>
      </>
    )
  }

}



function ScriptMetadata(props) {
  return (
    <div className="flex flex_row script-view-metadata">
      <ScriptMetadataComponent icon="calendar" text={ props.create_date } title="Submitted: "/>
      <ScriptMetadataComponent icon="calendar-alt" text={ props.update_date } title="Updated: "/>
      <ScriptMetadataComponent icon="user" text={ props.downloads } />
    </div>
  )
}

function ScriptMetadataComponent(props) {
  return(
  <div className="flex flex_row script-view-metadata-component">
    <i className={ "intro-tile-logo fas fa-lg fa-" + props.icon } />
    <div className="intro-tile-text">{ props.title + props.text }</div>
  </div>

  )
}

function ScriptDescription(props) {
  return (
    <div>
      <h1>Description</h1>
      { props.script_descr }
    </div>
  )
}

function ScriptCode(props) {
  return (
    <div>
      <h1>Code</h1>
      <textarea className="form-control" value={ props.script_code } style={{height: 500 + "px"}} readOnly/>
    </div>
  )
}