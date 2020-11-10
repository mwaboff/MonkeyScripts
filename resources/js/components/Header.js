import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LoginRegister from './LoginRegister.js';
// import Router from '../Router.js';



class Header extends React.Component {

  render() {
    let username = this.context['current_username'];
    let user_id = this.context['current_uid'];

    return (
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div className="container">
          <NavbarLogo />
          <NavbarToggler />
          <NavbarLinks  username={username} user_id = {user_id} />
          {/* { alert(user_id) } */}

          <LoginRegister />
        </div>
      </nav>
    )
  }
}

// Header.contextType = UserContext;

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
          <a href="/tutorial" className="nav-link">Tutorial</a>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">About</Link>
        </li>
        <li className="nav-item">
          { props.user_id }
        </li>
        {/* <LoggedInLinks user_id={ props.user_id } username={ props.username} />; */}
      </ul>
    </div>
  )
}

function LoggedInLinks(props) {
  return (
  <>
    <li className="nav-item">
      <Link to="/script" className="nav-link">Create</Link>
    </li>
    <li className="nav-item">
      <Link to={"/user/" + props.user_id} target="_blank">{ props.username }</Link>
    </li>
  </>
  )
}