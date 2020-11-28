import React from 'react';
import Header from './Header.js';
import { Redirect,  useParams} from "react-router-dom";
import { ScriptControlList, ScriptControlButton } from './ScriptControl.js';
import { NoPermission } from './Alerts.js';
import AuthInterface from '../interfaces/AuthInterface';
import RequestInterface from '../interfaces/RequestInterface';
import '../../css/ScriptModify.css';

function ScriptModify() {
  // Have to do this functional wrapper as useParams "hook" can't be run in a class based component apparently
  let { id } = useParams();
  id = id ? id : ''; // React was complaining that I wasn't converting id to a string when it was unidentified. Quick fix.

  return (
    <ScriptModifyMain id={ id } />
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
    let login_form = document.getElementById('script-form');
    login_form.addEventListener('submit', this.submitScript.bind(this));


    if (this.state.requested_id) {
      this.fetchScriptInfo().then(response => 
        this.setState({
          script_id: response["id"],
          script_title: response["title"],
          author_id: response["author_id"],
          script_summary: "???",
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
    console.log("PREVENTING DEFAULT ACTION");
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this script?")) return;

    let script_data = { "script_id": this.state.script_id }
    RequestInterface.sendRequest("/api/script/destroy", "POST", script_data)
    .then(response => this.redirectToHome());
  }

  redirectToScript(response) {
    let script_id = response["id"];
    return (
      <Redirect to={ "/script/" + script_id } />
    )
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
      <div className="container">
        <ScriptEditControls 
          script_id={ this.state.script_id }
          is_logged_in={ isMyScript(this.state.author_id, this.state.my_id) }
        />

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
  if (props.is_logged_in && props.script_id > 0) {
    delete_button = <ScriptControlButton logo="trash-alt" text="Delete" elem_id="script-delete" target="/" link_type="external" />
  }

  return (
    <ScriptControlList>

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

function isMyScript(script_author_id, my_user_id) {
  return script_author_id == '' || script_author_id == my_user_id;
}