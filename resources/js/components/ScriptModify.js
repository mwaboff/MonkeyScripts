import React from 'react';
import Header from './Header.js';
import InputCounter from './InputCounter.js';
import { Alert, NoPermission } from './Alert.js';
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
      alert("You do not have permission to edit this script.");
      return;
    }

    let form = document.getElementById('script-form');

    if (!validateForm()) {
      document.getElementById('script-form').addEventListener('change', validateForm);
      return;
    };

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
      .then(response => this.processSubmitResponse(response).bind(this));
  }

  deleteScript(e) {
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this script?")) return;

    gtag('event', 'page_view', {'page_location': {'page_location': window.location.pathname + "/delete" + window.location.search}})

    let script_data = { "script_id": this.state.script_id }
    RequestInterface.sendRequest("/api/script/destroy", "POST", script_data)
    .then(response => this.redirectToHome());
  }

  processSubmitResponse(response) {
    if (response['success']) {
      this.props.history.push("/script/" + response['script_id']);
    } else {
      alert(response['message']);
    }
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
      <div className="flex flex_row flex_space-between ic-container">
        <label className="mks-input-label" htmlFor="script-title">Title</label>
        <InputCounter elem_id="script-title" min={3} max={50} />
      </div>
      <input id="script-title" type="text" name="script-title" className="form-control mks-input" defaultValue={ props.script_info.script_title }></input>


      <div className="flex flex_row flex_space-between ic-container">
        <label className="mks-input-label" htmlFor="script-summary">Brief Summary</label>
        <InputCounter elem_id="script-summary" max={75} />
      </div>
      <input id="script-summary" type="text" name="script-summary" className="form-control mks-input" defaultValue={ props.script_info.script_summary }></input>


      <div className="flex flex_row flex_space-between ic-container">
        <label className="mks-input-label" htmlFor="script-desc">Description</label>
        <InputCounter elem_id="script-descr" />
      </div>
      <textarea id="script-descr" type="text" name="script-descr" className="form-control mks-input" style={{ height: 200 + "px" }} defaultValue={ props.script_info.script_descr }></textarea>

      <div className="flex flex_row flex_space-between ic-container">
        <label className="mks-input-label" htmlFor="script-code">Code</label>
        <InputCounter elem_id="script-code" />
      </div>
      <textarea id="script-code" name="script-code" className="form-control mks-input" style={{height: 500 + "px"}} defaultValue={ props.script_info.script_code }></textarea>
      <input type="submit" id="script-submit" className="mks-tile primary-control-btn script-submit-btn" value="Submit" />
    </form>
  )

}


function isMyScript(script_author_id, my_user_id) {
  return script_author_id == '' || script_author_id == my_user_id;
}

function validateForm() {
  Alert.removeAllBadInput();
  let result = true;
  let title = document.getElementById("script-title");
  let summary = document.getElementById("script-summary");
  let description = document.getElementById("script-descr")
  let code = document.getElementById("script-code");

  if (title.value.length < 3 || title.value.length > 50) {
    Alert.setBadInput(title, "Title has an incorrect length");
    result = false;
  }
  if (summary.value.length <= 0 || summary.value.length > 75) {
    Alert.setBadInput(summary, "Summary is required and cannot be more than 75 characters long");
    result = false;
  }
  if (description.value.length <= 0) {
    Alert.setBadInput(description, "Description is required");
    result = false;
  }
  if (code.value.length <= 0) {
    Alert.setBadInput(code, "Code is required");
    result = false;
  }

  return result;
}
