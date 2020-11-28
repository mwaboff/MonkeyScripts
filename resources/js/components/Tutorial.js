import React from 'react';
import Header from './Header.js';
import SearchBar from './SearchBar.js';
import ScriptList from './ScriptList.js';

import '../../css/StaticPage.css';


export default function Tutorial() {
  return (
    <>
    <Header 
      title = "Tutorial"
      subtitle = "What is this site even?"
      supplement = { <SearchBar /> }
    />
    <div className="container section">
      <TutorialText />
      <ScriptList listType="recommended" title="Now check out these scripts!" numScripts="8" is_primary="true" />

    </div>
    </>
  )
}

function TutorialText() {
  return (
    
    <div className="tutorial">
    <h1>Welcome to MonkeyScripts!</h1>
      <div className="tutorial-section">
        <div className="tutorial-text">
          User scripts are small add-ons that can be installed on just about any desktop web browser via a tool called a user script "manager". These scripts have the ability to modify a web page, adding features or even fixing annoyances that the website owner can't be bothered to fix. There are user scripts out there that provide useful features, such as adding an automatic refresh button to work queues, to outright silly ones, like replacing every image with a picture of Nicolas Cage. Your imagination is the limit!
        </div>
      </div>

      <div className="mks-alert info flex flex_center-full"><i className="fas fa-lg fa-info-circle alert-icon" /> While powerful, user scripts can only modify what your browser can see, it cannot access secure items on another server.</div>

      <div className="tutorial-section">
        <h2 className="tutorial-section-header"><b>Step 1:</b> Install a User Script Manager</h2>
        <div className="tutorial-text">
          The first thing needed is to install a user script manager. The most popular manager, with over 10 million users, is <a href="https://www.tampermonkey.net/" target="_blank">Tampermonkey.</a> Open the <a href="https://www.tampermonkey.net/" target="_blank">Tampermonkey website</a> and click on the Download button for your browser.
        </div>
        <div className="tutorial-text">
          This video will show you how to install Tampermonkey for Google Chrome. The Tampermonkey website has additional instruction videos for other browsers as well.
        </div>
        <div className="tutorial-video-container flex flex_center-full">
          <iframe width="600" height="400" src="https://www.youtube.com/embed/cu4XeYtqXbM" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </div>

      <div className="tutorial-section">
        <h2 className="tutorial-section-header"><b>Step 2:</b> Find a Script</h2>
        <div className="tutorial-text">
          Once you have installed a manager, the next step is to find a script you would like to install. For practice, let's install <a href="/script/10" target="_blank">the MonkeyScripts Tutorial script</a>. Click on the link to be directed to the tutorial page and click the Install button. A new tab will open and your user script manager will ask if you want to install the script.
        </div>
        <div className="tutorial-text">
          After you have installed the tutorial script, refresh this page. If done correctly, the box below will turn green!
        </div>
        <div id="monkeyscripts-tutorial-widget" className="mks-alert error" >
          If the background is red, the test script has not been installed. When installed, this will turn green.
        </div>
      </div>

      <div className="tutorial-section">
        <h2 className="tutorial-section-header"><b>Step 3:</b> Enjoy!</h2>
        <div className="tutorial-text">
          Congratulations, you now know how to install and use user scripts! If you ever want to uninstall a script, simply open up the Tampermonkey extension menu and turn the script's slider off.
        </div>
        <div className="tutorial-image flex flex_center-full">
          <img src="/img/tampermonkey_disable_script.png" width="358" height="400" />
        </div>
      </div>


      
    </div>
  )
}