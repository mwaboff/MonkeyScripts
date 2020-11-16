/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');


/* Start the Router which will manage which components to render */
// require('./Router');

import React from 'react';
import ReactDOM from 'react-dom';

import Router from './Router.js';


import UserContext from './contexts/UserContext.js';
import AuthInterface from './interfaces/AuthInterface.js';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: '',
        uid: -1,
        auth_group: 0
      },
      setLoggedOut: this.setLoggedOut.bind(this),
      setLoggedIn: this.setLoggedIn.bind(this)
    }
  }

  componentDidMount() {
    this.setLoggedIn();
  }

  setLoggedOut() {
    if (AuthInterface.isLoggedIn) return;

    this.setState({
      user: {
        username: '',
        uid: -1,
        auth_group: 0
      }
    })
  }

  setLoggedIn() {
    if (!AuthInterface.isLoggedIn) return;

    let $user_info = AuthInterface.whoAmI();

    this.setState({
      user: {
        username: $user_info.name,
        uid: $user_info.id,
        auth_group: 0
      }
    })
  }

  render() {
    return (
      <UserContext.Provider value={ this.state.user }>
      <Router />
      </UserContext.Provider>
    );
  }
}




ReactDOM.render(<App />, document.getElementById('app'));