import React from 'react';
import Header from './Header.js';
import SearchBar from './SearchBar.js';
import ScriptList from './ScriptList.js';
import IntroBanner from './IntroBanner.js';

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

        <IntroBanner />
        <ScriptHomeRecommender />
      </>
    )
  }
}

export default Home;


class ScriptHomeRecommender extends React.Component {
  render() {
    return (
      <>
      <div className="home-script-recommendations container">
        <ScriptList listType="recommended" title="Recommended" numScripts="4" is_primary="true" />
        <ScriptList listType="topdownload" title="Top Downloads" numScripts="8" />
        <ScriptList listType="recent" title="Recently Updated" numScripts="4" />
        <ScriptList listType="official" title="Editor's Choice" numScripts="4" />
      </div>
      </>
    )
  }
}