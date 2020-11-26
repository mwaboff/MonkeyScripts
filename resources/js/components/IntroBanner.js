import React from 'react';
import { Link } from "react-router-dom";
import '../../css/IntroBanner.css';



export default function IntroBanner(props) {
  return (
    <div className='intro-banner'>
      <div className='container flex flex_row intro-banner-contents'>
        <IntroText />
        <IntroTileList />
      </div>
    </div>
  )
}

function IntroText(props) {
  return (
    <div className='intro-text flex flex_column flex_center-vertical'>
      <h1>New to user scripts?</h1>
      <p>Ever want to download Youtube videos?</p>
      <p>Favorite site irritating?</p>
      <p>Click on the buttons to the right to get started!</p>
    </div>
  )
}

function IntroTileList(props) {
  return (
    <div className="intro-tile-list flex flex_center-full">
      <IntroTiles logo="book-open" text="Follow Tutorial" target="/tutorial" link_type="external"/>
      <IntroTiles logo="download" text="Install Manager" target="https://www.tampermonkey.net/" link_type="external"/>
      <IntroTiles logo="search" text="Find Scripts" target="/search" link_type="internal"/>
    </div>
  )
}

function IntroTiles(props) {
  if (props.link_type == "external") {
    return (
      < a href={ props.target } target="_blank" className="mks-tile intro-tile flex flex_column flex_center-full">
        <IntroTileContent logo = { props.logo } text = { props.text } />
      </a>
    )
  }

  return (
    <Link to={ props.target } className="mks-tile intro-tile flex flex_column flex_center-full">
      <IntroTileContent logo = { props.logo } text = { props.text } />

    </Link>
  )
  }
  

function IntroTileContent(props) {
  return (
    <>
      <i className={"intro-tile-logo fas fa-lg fa-"+props.logo} />
      <div className="intro-tile-text">{ props.text }</div>
    </>
  )
}