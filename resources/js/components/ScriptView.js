import React from 'react';
import Header from './Header.js';
import ScriptList from './ScriptList.js';
import { Link, useParams, useHistory } from "react-router-dom";
import UserContext from '../contexts/UserContext.js';
import RequestInterface from '../interfaces/RequestInterface';
import { ScriptControlList, ScriptControlButton } from './ScriptControl.js';
import '../../css/ScriptView.css';
import { isSet } from 'lodash';



export default function ScriptView() {
  // Have to do this functional wrapper as useParams "hook" can't be run in a class based component apparently
  let { id, display } = useParams();
  let history = useHistory();
  return (
    <ScriptViewMain id={ id } display={ display } history={ history }/>
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
    gtag('event', 'page_view', {'page_location': window.location.pathname + window.location.search});
  }

  componentDidUpdate() {
    if (this.props.id !== this.state.requested_id) {
      this.setState({requested_id: this.props.id});
      this.initiateScriptFetch(this.props.id);      
    }

    if(this.props.display !== this.state.display) {
      this.setState({display: this.props.display});
    }

    let code_block = document.getElementById("mks-code");
    if(code_block) hljs.highlightBlock(code_block);

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
        create_date: response["created_day"],
        update_date: response["updated_day"],
        downloads: response["downloads"].toString()
      })
    );
    

  }

  sendClickedDownload(e) {
    // e.preventDefault();
    const req_url = "/api/script/install/" + this.state.script_id;
    gtag('event', 'script_install', {'script_id': this.state.script_id });
    
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

    let metadata = <ScriptMetadata create_date = { this.state.create_date } update_date = { this.state.update_date } downloads = { this.state.downloads } />;

    return (
      <>
      <Header 
        title={ this.state.script_title } 
        subtitle={ author_link }
        tagline={this.state.script_summary }
        supplement={ metadata }
      />

      <UserContext.Consumer>
        {(value) => (<ScriptViewControls 
          author_id = { this.state.author_id }  
          user = { value.user } 
          script_id = { this.state.script_id } 
          display = { this.state.display }
        />)}
      </UserContext.Consumer>

      <div className="container" readOnly>
        <div className="script-view-content section">
          { view_content }
        </div>

        <ScriptList listType="similar" numScripts="4" scriptId= { this.state.requested_id } title="Check out these other scripts!" is_primary="true" />
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
      <ScriptMetadataComponent icon="user" text={ props.downloads } title="Downloads: " />
    </div>
  )
}

function ScriptViewControls(props) {
  let install_url = "/script/" + props.script_id + ".user.js";

  // Check to see if we should render the code button or the description button
  let display_link = <ScriptControlButton logo="file-code" text="View Code "  target={ "/script/" + props.script_id + "/code" } />
  if (props.display == "code") {
    display_link = <ScriptControlButton logo="file-alt" text="View Description "  target={ "/script/" + props.script_id } />
  }
  
  // Check to see if we should render an edit button
  let edit_script_link = "";
  if (props.user.uid != '' && props.user.uid == props.author_id) {
    let edit_url = "/script/" + props.script_id + "/edit";
    edit_script_link = <ScriptControlButton logo="wrench" text="Edit" target={ edit_url }/>
  }

  return (
    <ScriptControlList>
      <ScriptControlButton logo="file-download" text="Install" elem_id= "install-button" target={ install_url } link_type="external" is_primary="true"/>
      { display_link }
      <ScriptControlButton logo="question" text="What is this?" target="/tutorial" link_type="external" />
      { edit_script_link }
    </ScriptControlList>
  );
}

function ScriptMetadataComponent(props) {
  return(
  <div className="flex flex_row script-view-metadata-component">
    <i className={ "script-view-metadata-icon fas fa-lg fa-" + props.icon } />
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
      <pre id="mks-code" className="form-control javascript" style={{height: 500 + "px"}}>{ props.script_code }</pre>
    </div>
  )
}