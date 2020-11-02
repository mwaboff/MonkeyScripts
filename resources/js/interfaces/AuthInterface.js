import RequestInterface from './RequestInterface.js';
import CookieInterface from './CookieInterface.js';

class AuthInterface {

  static async login(username, password) {
    RequestInterface.sendRequest("/api/login", "POST", {username: username, password: password}).then(response => AuthInterface.manageLogin(username, response));
  }

  static async register(username, email, password, password_confirmation) {
    RequestInterface.sendRequest("/api/register", "POST", {name: username, email: email, password: password, password_confirmation: password_confirmation})
      .then(response => AuthInterface.manageRegistration(response));
  }

  static manageLogin(username, response) {
    if(response.access_token) {
      let cookie = new CookieInterface;
      cookie.set('username', username);
      cookie.set('access_token', response.access_token);
      cookie.set('refresh_token', response.refresh_token);
      alert("you have logged in, " + username);
    } else {
      alert ("Failed login :(");
    }
  }

  static manageRegistration(response) {
    console.log(response);
  }

}

export default AuthInterface;