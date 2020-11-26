import React from 'react';
import ScriptTile from './ScriptTile.js';
import ScriptList from './ScriptList.js';
import SearchBar from './SearchBar.js';
import Header from './Header.js';

class Home extends React.Component {
  render() {
    return (
      <>
        <Header 
          title="Take back control of the web." 
          tagline="User scripts are small browser add-ons that pack a big punch."
          tagline2="Modify your favorite websites to fix annoyances or add new features!"
          supplement={ <SearchBar /> }
        />

        {/* <Search /> */}
        <ScriptHomeRecommender />
      </>
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
      <>
      <div className="flex flex_center-horizontal">
      <ScriptTile script_id="2" title="HackForums Enhancement Suite v2.0 Electric Boogaloo" summary="Wow a real life summary" is_primary="true" downloads="1255" />
      <ScriptTile script_id="1" title="Custom Twitter Links" summary="Wow a real life summary" primary="true" downloads="305" />
      </div>

      <div className="home-script-recommendations row">
        <ScriptList listType="topdownload" numScripts="6" />
        <ScriptList listType="recommended" numScripts="6" />
        <ScriptList listType="recent" numScripts="6" />
        <ScriptList listType="official" numScripts="6" />
      </div>
      </>
    )
  }
}