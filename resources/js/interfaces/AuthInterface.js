import React from 'react';

import RequestInterface from './RequestInterface.js';
import CookieInterface from './CookieInterface.js';

class AuthInterface {

  static async login(email, password) {
    RequestInterface.sendRequest("/api/login", "POST", {username: email, password: password})
      .then(response => AuthInterface.manageLogin(email, response))
      .then(AuthInterface.whoAmI());
  }

  static async register(username, email, password, password_confirmation) {
    RequestInterface.sendRequest("/api/register", "POST", {name: username, email: email, password: password, password_confirmation: password_confirmation})
      .then(response => AuthInterface.manageRegistration(response));
  }

  static manageLogin(username, response) {
    if(response.access_token) {
      CookieInterface.set('username', username);
      CookieInterface.set('access_token', response.access_token);
      CookieInterface.set('refresh_token', response.refresh_token);
      alert("you have logged in, " + username);
    } else {
      alert ("Failed login :(");
    }
  }

  static manageRegistration(response) {
  }

  static isLoggedIn() {
    return CookieInterface.get('access_token') ? true : false;
  }

  static getAccessToken() {
    return CookieInterface.get('access_token');
  }

  static whoAmI() {
    return {
      name: CookieInterface.get('username'),
      uid: CookieInterface.get('uid')
    }
  }

  static updateAccountInfo(response) {
  }

}

export default AuthInterface;