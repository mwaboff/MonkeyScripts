import React from 'react';
import fitty from 'fitty';
import '../../css/ScriptTile.css';


export default function ScriptTile(props) {
  return (
    <div className="card script-tile flex flex_column">
      <ScriptTileHeader title = { props.title } script_id = { props.script_id } is_primary = { props.is_primary } />
      <ScriptTileBody summary = { props.summary } downloads = { props.downloads }/>
      <ScriptTileBottom downloads = { props.downloads } />
    </div>
  )
}

class ScriptTileHeader extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      header_id: "script-tile-header-id-" + props.script_id,
      is_primary: props.is_primary ? "script-tile-header-primary" : ""
    };
  }

  componentDidMount() {
    let id = "#" + this.state.header_id;
    fitty(id, {
      minSize: 13,
      maxSize: 20,
      multiLine: true
    });
  }

  render() {
    return ( 
      <div id={ this.state.header_id } className= {"script-tile-header script-tile-primary flex flex_center-vertical " + this.state.is_primary }>
        <div id={ this.state.header_id } className="script-title">
          { this.state.title }
        </div>
      </div>
    )
  }
}

function ScriptTileBody(props) {
  return (
    <div className="script-tile-body script-tile-summary">
      { props.summary }
    </div>
  )
}

function ScriptTileBottom(props) {
  return (
    <div className="script-tile-footer script-tile-user-count">
      <i className="fas fa-user" /> { props.downloads } downloads
    </div>

  )
}