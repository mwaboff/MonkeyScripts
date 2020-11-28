import React from 'react';
import { Link } from "react-router-dom";
import '../../css/ScriptControl.css';


export function ScriptControlList(props) {
  return (
    <div className="container script-control-list flex flex_row">
      { props.children }
    </div>
  )
}

export function ScriptControlButton(props) {
  let primary_class = props.is_primary == "true" ? "primary-control-btn" : "";
  let warning_class = props.is_warning == "true" ? "warning-control-btn" : "";
  let shared_class_names = "mks-tile script-control-btn flex flex_center-full " + (primary_class) + (warning_class);
  let inner_content = <ScriptControlText logo={ props.logo } text = { props.text } />
  if (props.link_type == "external") {
    return (
      <a href={ props.target } id={ props.elem_id } target="_blank" className={ shared_class_names }>{ inner_content }</a>
    )
  }

  return <Link to={ props.target } id={ props.elem_id } className={ shared_class_names }>{ inner_content }</Link>
}

function ScriptControlText(props) {
  return (
    <div className="flex flex_column flex_center-full">
      <i className={"intro-tile-logo fas fa-lg fa-"+props.logo} />
      <div className="intro-tile-text">{ props.text }</div>
    </div>
  )
}