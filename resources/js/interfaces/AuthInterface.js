import React from 'react';

import RequestInterface from './RequestInterface.js';
import CookieInterface from './CookieInterface.js';


class AuthInterface {

  /**
   * Send the login request.
   * 
   * @param {string} email
   * @param {string} password
   * 
   */
  static async login(email, password) {
    return RequestInterface.sendRequest("/api/login", "POST", {username: email, password: password})
      .then(response => AuthInterface.manageLogin(email, response));
  }

  /**
   * Send the registration request.
   * 
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @param {string} password_confirmation
   * 
   */
  static async register(username, email, password, password_confirmation) {
    return RequestInterface.sendRequest("/api/register", "POST", {name: username, email: email, password: password, password_confirmation: password_confirmation})
      .then(response => AuthInterface.manageRegistration(response));
  }

  /**
   * Logout by removing the cookie data.
   *
   */
  static logout() {
    let target_address = "/oauth/tokens/" + CookieInterface.get('access_token');
    // RequestInterface.sendRequest(target_address, "DELETE", {});
    CookieInterface.remove('username');
    CookieInterface.remove('user_id');
    CookieInterface.remove('access_token');
    CookieInterface.remove('refresh_token');
  }

  /**
   * If access_token is provided in the response, we know we successfully logged in. Sets cookie data to info provided by server.
   *
   * @param {string} username
   * @param {Object} response
   * @return {Object}
   */
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

  /**
   * Placeholder for managing process after registration
   */
  static manageRegistration(response) {
    return response;
  }

  /**
   * Check if user is currently logged in
   * 
   * @return {bool}
   */
  static isLoggedIn() {
    return CookieInterface.get('access_token') ? true : false;
  }

  /**
   * Get the currently in-use access token from the Cookie
   * 
   * @return {string}
   */
  static getAccessToken() {
    return CookieInterface.get('access_token');
  }

  /**
   * Get the currently logged in username and ID from the cookie
   * 
   * @return {string}
   */
  static whoAmI() {
    return {
      name: CookieInterface.get('username'),
      uid: CookieInterface.get('user_id')
    }
  }

}

export default AuthInterface;