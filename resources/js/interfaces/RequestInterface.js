import AuthInterface from "./AuthInterface";
import CookieInterface from "./CookieInterface";

class RequestInterface {

  static async sendRequest(target, method="GET", body={}) {
    if (method == "GET") {
      return await RequestInterface.sendGetRequest(target);
    }
    return await RequestInterface.sendPostRequest(target, method=method, body);
  }
  
  static async sendGetRequest(target) {
    let response = await fetch(target);
    return response.json();
  }

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