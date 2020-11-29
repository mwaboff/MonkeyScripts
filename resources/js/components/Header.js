import React from 'react';
import Navbar from './Navbar.js';
import UserContext from '../contexts/UserContext.js';
import '../../css/Header.css';

export default function Header(props) {
  // props.supplement can be any component, such as a search bar or script metadata
  let size_class = props.size == "large" ? "header-lg" : "header-sm";
  return (
    <div className={ "header-banner " + size_class }>
      <BackgroundOverlay />
      <UserContext.Consumer>
        {(value) => (<Navbar setLoggedOut={ value.setLoggedOut } user={ value.user } />)}
      </UserContext.Consumer>

      <div className="container full-header">
        <div className="header-components full-header flex flex_column">
          <div className="header-text z-index-10">
            <div className="header-titles">
              <Title title_text = { props.title } />
              <Subtitle subtitle_text = { props.subtitle } />
            </div>
            <Tagline tagline_text = { props.tagline } />
            <Tagline tagline_text = { props.tagline2 } />
          </div>
          <div className="header-supplement flex flex_center-vertical z-index-10">
            { props.supplement }
          </div>
        </div>
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

function BackgroundOverlay(props) {
  return (
    <div className="header-bkg-overlay" />
  )
}