import AuthInterface from "./AuthInterface";
import CookieInterface from "./CookieInterface";

class RequestInterface {

  /**
   * Entry point to the request interface, routes different types of requests to different GET or POST method functions
   * @param {string} target 
   * @param {string} method 
   * @param {Object} body 
   */
  static async sendRequest(target, method="GET", body={}) {
    if (method == "GET") {
      return await RequestInterface.sendGetRequest(target);
    }
    return await RequestInterface.sendPostRequest(target, method=method, body);
  }
  
  /**
   * Send a simple GET request to provided target URL
   * @param {string} target 
   * @return {Object} response
   */
  static async sendGetRequest(target) {
    let response = await fetch(target);
    return response.json();
  }

  /**
   * Send a POST request to provided target URL
   * @param {string} target 
   * @return {Object} response
   */
  static async sendPostRequest(target, method, body) {

    let response = await fetch(target, {
      method: method,
      mode: 'cors',
      credentials: 'same-origin',
      headers: RequestInterface.defineHeader(),
      redirect: 'manual',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(body),
    });

    return response.json();
  }

  /**
   * Build the headers needed for POST requests, including adding access token when user is logged in.
   * @return {Object} headers
   */
  static defineHeader() {
    let csrf = document.querySelector('meta[name="csrf-token"]').content;

    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-TOKEN': csrf
    }

    if (AuthInterface.isLoggedIn) {
      headers["Authorization"] = "Bearer " + AuthInterface.getAccessToken();
    }

    return headers;
  }
}

export default RequestInterface;