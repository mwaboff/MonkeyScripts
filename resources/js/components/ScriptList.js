import React from 'react';
import ReactDOM from 'react-dom';


class ScriptList extends React.Component {


  constructor(props) {
    super(props);
    this.state = { list_type: props.listType, num_scripts: props.numScripts, response: [] };
    this.script_list = [
      {"script_id": 1, "title": "Script 1", "descr": "This is the description"},
      {"script_id": 2, "title": "Script 2", "descr": "This is the description1"},
      {"script_id": 3, "title": "Script 3", "descr": "This is the description2"},
      {"script_id": 4, "title": "Script 4", "descr": "This is the description3"},
      {"script_id": 5, "title": "Script 5", "descr": "This is the description4"},
      {"script_id": 6, "title": "Script 6", "descr": "This is the description5"}
    ];
  }

  componentDidMount() {
    this.fetchScriptList().then(script_list => 
      this.setState({response: script_list})
    );

  }

  async fetchScriptList() {
    const rec_url = "/api/script/recommend/?type=" + this.state.list_type + 
      "&count=" + this.state.num_scripts;
    const response = await fetch(rec_url);
    return response.json();
  }

  render() {
    let script_entries = <ScriptEntryListWaiting />
    // console.log(this.state);
    if (this.state.response.length) {
      // console.log(this.state.response);
      script_entries = <ScriptEntryList scripts={this.state.response} />;
    }

    return (
      <div className="col-md-6">
        <ScriptListTitle list_type={this.state.list_type} />
        {script_entries}
      </div>
    )
  }

}

export default ScriptList;

function ScriptEntryList(props) {
  return (
    <ul className="script-list">

    {
      props.scripts.map((script) => 
        <li key={script.id} className="script-entry card"><ScriptEntry script={script} /></li>
      )
    }
    </ul>
  )
}

function ScriptEntryListWaiting() {
  return (
    <ul className="script-list">
      <li key="1" className="card">Loading...</li>
    </ul>
  )
}

class ScriptListTitle extends React.Component {
  constructor(props) {
    super(props);
    this.LIST_TYPES = {
      "topdownload": "Top Download", 
      "toprated": "Top Rated",
      "recent": "Recently Updated",
      "choice" : "Editor's Choice"
    };
  
    this.state = {title: this.LIST_TYPES[props.list_type]};
  }

  render() {
    return (
    <div className="script-list-title">{ this.state.title }</div>
    )
  }
}


function ScriptEntry(props) {
  return (
    <div className="card">
      <div className="card-body">
        <b> { props.script.title } </b> - { props.script.description }
      </div>
    </div>
  )
}