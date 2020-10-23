import React from 'react';
import ReactDOM from 'react-dom';


class Header extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div className="container">
          <NavbarLogo />
          <NavbarToggler />
          <NavbarLinks isLoggedIn={this.props.isLoggedIn}/>
        </div>
      </nav>
    )
  }
}

function NavbarLogo() {
  return (
    <a className="navbar-brand" href="/">MonkeyScripts</a>
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
          <a className="nav-link" href="/login">Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/register">Register</a>
        </li>
      </ul>
    </div>
  )
}

ReactDOM.render(<Header isLoggedIn="1" />, document.getElementById('react-header'));
