import React from 'react';
import ReactDOM from 'react-dom';

  import ScriptList from './ScriptList.js';
  import Search from './Search.js';

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <HomeBanner />
        <Search />
        <ScriptHomeRecommender />
      </div>
    )
  }
}

export default Home;


function HomeBanner(props) {
  return (
  <div className="jumbotron">
    <div>
      <h1>What are user scripts? How can they help?</h1>
      <h4>User scripts are small browser extensions that can add features and fix bugs on your favorite sites!</h4>
    </div>
  </div>
  )
}

class ScriptHomeRecommender extends React.Component {
  render() {
    return (
      <div className="home-script-recommendations row">
        <ScriptList listType="topdownload" numScripts="6" />
        <ScriptList listType="toprated" numScripts="6" />
        <ScriptList listType="recent" numScripts="6" />
        <ScriptList listType="choice" numScripts="6" />
      </div>
    )
  }
}

// ReactDOM.render(<Home isLoggedIn="1" />, document.getElementById('react-body'));