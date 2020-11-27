import React from 'react';
import { Link } from "react-router-dom";
import '../../css/ScriptViewLinks.css';




export default function ScriptViewLinks(props) {
  let install_url = "/script/" + props.script_id + ".user.js";

  // Check to see if we should render the code button or the description button
  let display_link = <ScriptViewLink logo="file-code" text="View Code "  target={ "/script/" + props.script_id + "/code" } />
  if (props.display == "code") {
    display_link = <ScriptViewLink logo="file-alt" text="View Description "  target={ "/script/" + props.script_id } />
  }
  
  // Check to see if we should render an edit button
  let edit_script_link = "";
  console.log(props);
  if (props.user.uid != '' && props.user.uid == props.author_id) {
    let edit_url = "/script/" + props.script_id + "/edit";
    edit_script_link = <ScriptViewLink logo="wrench" text="Edit" target={ edit_url }/>
  }

  return (
    <div className="script-view-links flex flex_row">
      <ScriptViewLink logo="file-download" text="Install" elem_id= "install-button" target={ install_url } link_type="external" />
      { display_link }
      <ScriptViewLink logo="question" text="What is this?" target="/tutorial" link_type="external" />
      { edit_script_link }
    </div>
  );
}


function ScriptViewLink(props) {
  let shared_class_names = "mks-tile script-view-tile flex flex_column flex_center-full";
  if (props.link_type == "external") {
    return (
      < a href={ props.target } id={ props.elem_id } target="_blank" className={ shared_class_names }>
        <ScriptLinkContent logo = { props.logo } text = { props.text } />
      </a>
    )
  }

  return (
    <Link to={ props.target } id={ props.elem_id } className={ shared_class_names }>
      <ScriptLinkContent logo = { props.logo } text = { props.text } />

    </Link>
  )
}


function ScriptLinkContent(props) {
  return (
    <>
      <i className={"intro-tile-logo fas fa-lg fa-"+props.logo} />
      <div className="intro-tile-text">{ props.text }</div>
    </>
  )
}