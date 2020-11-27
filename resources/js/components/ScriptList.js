import { isSet } from 'lodash';
import React from 'react';
import ScriptTile from './ScriptTile';
import { Link } from "react-router-dom";
import RequestInterface from '../interfaces/RequestInterface';
import '../../css/ScriptList.css';




class ScriptList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      list_type: props.listType, 
      title: props.title,
      is_primary: props.is_primary,
      num_scripts: props.numScripts, 
      curr_script_id: props.scriptId,
      response: [] 
    };
  }

  componentDidMount() {
    this.fetchScriptList().then(script_list => 
      this.setState({response: script_list})
    );
  }

  componentDidUpdate() {
    if(this.props.scriptId !== this.state.curr_script_id) {
      this.setState({curr_script_id: this.props.scriptId });
      this.fetchScriptList().then(script_list => 
        this.setState({response: script_list})
      );
    }
  }

  async fetchScriptList() {
    let rec_url = "/api/script/recommend/?type=" + this.state.list_type + "&count=" + this.state.num_scripts;
    if (this.state.curr_script_id) rec_url += "&scriptid=" + this.state.curr_script_id;
    return RequestInterface.sendRequest(rec_url);
  }

  render() {
    return (
      <div className="script-list section">
        <ScriptListTitle title={ this.state.title } />
        <ScriptTileList scripts={ this.state.response } is_primary={ this.state.is_primary }/>
      </div>
    )
  } 
}

export default ScriptList;


function ScriptListTitle(props) {
  return (
    <h3 className="script-list-title">{ props.title }</h3>
  );
}


export function ScriptTileList(props) {
  return (
    <ul className="script-tile-list">
    {
      props.scripts.map((script) => 
        <li key={script.id}>
          <ScriptTile 
            title={ script.title } 
            script_id={ script.id }
            summary={ script.summary }
            downloads={ script.downloads }
            is_primary={ props.is_primary }
          />
        </li>
      )
    }
    </ul>
  )
}





export function ScriptEntryListWaiting() {
  return (
    <ul className="script-list">
      <li key="1" className="card">Loading...</li>
    </ul>
  )
}



function ScriptEntry(props) {
  return (
    <Link to={"/script/" + props.script.id } className="card">
      <div className="card-body">
        <b> { props.script.title } </b> - { props.script.description }
      </div>
    </Link>
  )
}