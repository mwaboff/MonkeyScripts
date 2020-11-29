import React from 'react';
import Header from './Header.js';
import { NoPermission } from './Alerts.js';
import AuthInterface from '../interfaces/AuthInterface';
import RequestInterface from '../interfaces/RequestInterface';
import { Redirect,  useParams, useHistory} from "react-router-dom";
import { ScriptControlList, ScriptControlButton } from './ScriptControl.js';
import '../../css/ScriptModify.css';

function ScriptModify() {
  // Have to do this functional wrapper as useParams "hook" can't be run in a class based component apparently
  let { id } = useParams();
  let history = useHistory();
  id = id ? id : ''; // React was complaining that I wasn't converting id to a string when it was unidentified. Quick fix.

  return (
    <ScriptModifyMain id={ id } history={ history }/>
  )
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
      author_id: "",
      my_id: AuthInterface.whoAmI()["uid"]
    };
  }

  getScriptInfo(script_id) {
    let rec_url = "/api/script/show?id=" + this.state.requested_id;
    return RequestInterface.sendRequest(rec_url);

  }

  componentDidMount() {
    // let login_form = document.getElementById('script-form');
    // login_form.addEventListener('submit', this.submitScript1.bind(this));

    let submit_control_button = document.getElementById('script-control-submit');
    submit_control_button.addEventListener('click', this.submitScript.bind(this));
    let submit_button = document.getElementById('script-submit');
    submit_button.addEventListener('click', this.submitScript.bind(this));


    if (this.state.requested_id) {
      this.fetchScriptInfo().then(response => 
        this.setState({
          script_id: response["id"],
          script_title: response["title"],
          author_id: response["author_id"],
          script_summary: response["summary"],
          script_descr: response["description"],
          script_code: response["code"],
          my_id: AuthInterface.whoAmI()["uid"]
        })
      );
    }
  }

  componentDidUpdate() {
    let delete_form = document.getElementById('script-delete');
    if (delete_form) {
      delete_form.addEventListener('click', this.deleteScript.bind(this));
    }
  }

  async fetchScriptInfo() {
    const rec_url = "/api/script/show?id=" + this.state.requested_id;
    return RequestInterface.sendRequest(rec_url, "POST", {});
  }

  submitScript(e) {
    e.preventDefault();
    if (!isMyScript(this.state.author_id, this.state.my_id)) {
      alert("You do not have permission to edit this");
      return;
    }

    let form = document.getElementById('script-form');
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
      .then(response => this.redirectToScript(response).bind(this));
  }

  deleteScript(e) {
    console.log("PREVENTING DEFAULT ACTION");
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this script?")) return;

    let script_data = { "script_id": this.state.script_id }
    RequestInterface.sendRequest("/api/script/destroy", "POST", script_data)
    .then(response => this.redirectToHome());
  }

  redirectToScript(response) {
    let script_id = response["id"];
    this.props.history.push("/script/" + script_id);
  }

  redirectToHome() {
    return <Redirect to="/" />
  }

  render(props) {
    if (!isMyScript(this.state.author_id, this.state.my_id)) {
      return <NoPermission message="You do not have permission to edit this script" />
    }
    return (
      <>
      <Header 
        title="Script Editor" 
        subtitle="Changing the world, one script at a time!"
      />
      <ScriptEditControls 
        script_id={ this.state.script_id }
        is_logged_in={ isMyScript(this.state.author_id, this.state.my_id) }
      />

      <div className="container">
        <div className="section">
          <PageTitle id={this.state.requested_id}/>
          <ScriptForm script_info={ this.state }/>
        </div>
      </div>
    </>
      
    )
  }
}

export default ScriptModify;

function ScriptEditControls(props) {
  let delete_button = "";
  let return_button = "";
  if (props.is_logged_in && props.script_id > 0) {
    delete_button = <ScriptControlButton logo="trash-alt" text="Delete" elem_id="script-delete" target="/" link_type="external" is_warning="true" />
    return_button = <ScriptControlButton logo="file-code" text="View Script" target={"/script/" + props.script_id} />
  }

  return (
    <ScriptControlList>
      <ScriptControlButton logo="upload" elem_id="script-control-submit" text="Submit" target="/" link_type="external" is_primary="true" />
      { return_button }
      <ScriptControlButton logo="question" text="What is this?" target="/tutorial" link_type="external" />
      { delete_button }

    </ScriptControlList>
  )
}

function PageTitle(props) {
  return (
    <h1>{ props.id ? "Edit Script": "Create Script"}</h1>
  )
}

function ScriptForm(props) {
  return (
    <form id="script-form" action="api/script/new" method="POST">
      <label htmlFor="script-title">Title</label>
      <input id="script-title" type="text" name="script-title" className="form-control" defaultValue={ props.script_info.script_title }></input>
      <label htmlFor="script-summary">Brief Summary</label>
      <input type="text" name="script-summary" className="form-control" defaultValue={ props.script_info.script_summary }></input>
      <label htmlFor="script-desc">Description</label>
      <textarea type="text" name="script-descr" className="form-control" style={{ height: 200 + "px" }} defaultValue={ props.script_info.script_descr }></textarea>
      <label htmlFor="script-code">Code</label>
      <textarea name="script-code" className="form-control" style={{height: 500 + "px"}} defaultValue={ props.script_info.script_code }></textarea>
      <input type="submit" id="script-submit" className="mks-tile" value="Submit" />
    </form>
  )

}

function isMyScript(script_author_id, my_user_id) {
  return script_author_id == '' || script_author_id == my_user_id;
}