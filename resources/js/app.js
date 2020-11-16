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
        uid: '',
        auth_group: 0
      }
    }
  }

  componentDidMount() {
    this.setLoggedIn();
  }

  setLoggedOut() {
    AuthInterface.logout();

    this.setState({
      user: {
        username: '',
        uid: '',
        auth_group: 0
      }
    });

    console.log("App.setLoggedOut");
    console.log(this.state.user);
  }

  setLoggedIn(name='', uid='') {
    let $user_info = {};
    if (name == '' && uid == '' && AuthInterface.isLoggedIn()) {
      $user_info = AuthInterface.whoAmI();
    } else {
      $user_info = {
        name: name,
        uid: uid
      }
    }

    this.setState({
      user: {
        username: $user_info.name,
        uid: $user_info.uid,
        auth_group: 0
      }
    });
  }

  render() {

    let context_values = {
      user: this.state.user,
      setLoggedOut: this.setLoggedOut.bind(this),
      setLoggedIn: this.setLoggedIn.bind(this)
    }

    // console.log("running app render");
    return (
      <UserContext.Provider value={ context_values }>
      <Router />
      </UserContext.Provider>
    );
  }
}




ReactDOM.render(<App />, document.getElementById('app'));