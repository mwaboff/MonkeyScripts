import React from 'react';

import RequestInterface from './RequestInterface.js';
import CookieInterface from './CookieInterface.js';

class AuthInterface {

  static async login(email, password) {
    console.log("Sending LOGIN request");
    return RequestInterface.sendRequest("/api/login", "POST", {username: email, password: password})
      .then(response => AuthInterface.manageLogin(email, response));
  }

  static async register(username, email, password, password_confirmation) {
    RequestInterface.sendRequest("/api/register", "POST", {name: username, email: email, password: password, password_confirmation: password_confirmation})
      .then(response => AuthInterface.manageRegistration(response));
  }

  static logout() {
    let target_address = "/oauth/tokens/" + CookieInterface.get('access_token');
    // RequestInterface.sendRequest(target_address, "DELETE", {});
    CookieInterface.remove('username');
    CookieInterface.remove('user_id');
    CookieInterface.remove('access_token');
    CookieInterface.remove('refresh_token');
  }

  static manageLogin(username, response) {
    if(response.access_token) {
      CookieInterface.set('username', response.user_name);
      CookieInterface.set('user_id', response.user_id);
      CookieInterface.set('access_token', response.access_token);
      CookieInterface.set('refresh_token', response.refresh_token);
    } else {
    }
    return response;
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
      uid: CookieInterface.get('user_id')
    }
  }

  static updateAccountInfo(response) {
  }

}

export default AuthInterface;