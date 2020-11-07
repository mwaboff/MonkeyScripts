import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LoginRegister from './LoginRegister.js';



class Header extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div className="container">
          <NavbarLogo />
          <NavbarToggler />
          <NavbarLinks isLoggedIn={this.props.isLoggedIn}/>
          <LoginRegister />
        </div>
      </nav>
    )
  }
}

export default Header;


function NavbarLogo() {
  return (
    <Link to="/" className="navbar-brand">MonkeyScripts</Link>
  )
}

function NavbarToggler() {
  return (
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle Navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  )
}

function NavbarLinks(props) {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/about" className="nav-link">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/script" className="nav-link">Create</Link>
        </li>
        <li className="nav-item">
          <Link to="" className="nav-link" data-toggle="modal" data-target="#login-modal" onClick={(e) => e.preventDefault }>Login/Register</Link>
        </li>
      </ul>
    </div>
  )
}