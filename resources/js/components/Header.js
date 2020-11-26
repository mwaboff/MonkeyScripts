import React from 'react';
import Navbar from './Navbar.js';
import UserContext from '../contexts/UserContext.js';
import '../../css/Header.css';

export default function Header(props) {
  let supplement_component = props.supplement; // This can be anything like a search bar or script metadata
  return (
    <div className="header-banner">

      <UserContext.Consumer>
        {(value) => (<Navbar setLoggedOut={ value.setLoggedOut } setLoggedOut={ value.setLoggedOut } />)}
      </UserContext.Consumer>


      <div className="container">
        <div className="header-text">
          <div className="header-titles">
            <Title title_text = { props.title } />
            <Subtitle subtitle_text = { props.subtitle } />
          </div>
          <Tagline tagline_text = { props.tagline } />
          <Tagline tagline_text = { props.tagline2 } />
        </div>
        { props.supplement }
      </div>
    </div>
  );
}

function Title(props) {
  return (
    <div className="header-title">{ props.title_text }</div>
  )
}

function Subtitle(props) {
  return (
    <div className="header-subtitle">{ props.subtitle_text }</div>
  )
}

function Tagline(props) {
  return (
    <div className="header-tagline">{ props.tagline_text }</div>
  )
}