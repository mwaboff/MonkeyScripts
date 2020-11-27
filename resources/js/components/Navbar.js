import React from 'react';
import { Link } from "react-router-dom";
import LoginRegister from './LoginRegister.js';
import UserContext from '../contexts/UserContext.js';

import '../../css/Navbar.css';



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setLoggedIn: props.setLoggedIn,
      setLoggedOut: props.setLoggedOut
    }

  }

  componentDidUpdate() {
    let logout_button = document.getElementById('logout-button');
    if(logout_button){
      logout_button.addEventListener('click', this.startLogout.bind(this));
    }
  }

  startLogout(e) {
    e.preventDefault();
    this.state.setLoggedOut();
  }

  render() {

    return (
      <nav className="navbar navbar-expand-md navbar-mks">
        <div className="container">
          <NavbarLogo />
          <NavbarToggler />
          <UserContext.Consumer>
            {(value) => (<NavbarLinks  user={ value.user } />) }
          </UserContext.Consumer>
          <UserContext.Consumer>
            {(value) => (<LoginRegister setLoggedIn={ value.setLoggedIn } setLoggedOut={ value.setLoggedOut } />)}
          </UserContext.Consumer>
        </div>
      </nav>
    )
  }
}

// Header.contextType = UserContext;

export default Header;


function NavbarLogo() {
  return (
      <Link to="/" className="navbar-brand">
        MonkeyScripts
      </Link>
  )
}

function NavbarToggler() {
  return (
    <button className="navbar-dark navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle Navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  )
}

function NavbarLinks(props) {
  let logged_links = <LoggedOutLinks />

  if(props.user.uid != "") {
    logged_links = <LoggedInLinks user = {props.user} />;
  }

  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
          <a href="/tutorial" className="nav-link">Tutorial</a>
        </li>
        <li className="nav-item">
          <Link to="/search" className="nav-link">Search</Link>
        </li>
        { logged_links }
      </ul>
    </div>
  )
}

function LoggedInLinks(props) {
  return (
    <>
      <li className="nav-item">
        <Link to="/script/new" className="nav-link">Create</Link>
      </li>
      <li className="nav-item">
        <Link to={ "/user/" + props.user.uid } className="nav-link">Profile</Link>
      </li>
      <li className="nav-item">
        <Link to="" id="logout-button" className="nav-link">Logout</Link>
      </li>
    </>
  )
}

function LoggedOutLinks(props) {
  return (
    <>
    <li className="nav-item">
      <Link to="" className="nav-link" data-toggle="modal" data-target="#login-modal" onClick={(e) => e.preventDefault() }>Login/Register</Link>
    </li>
    </>
  )
}