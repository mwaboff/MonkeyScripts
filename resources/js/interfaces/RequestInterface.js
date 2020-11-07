import AuthInterface from "./AuthInterface";
import CookieInterface from "./CookieInterface";

class RequestInterface {

  static async sendRequest(target, method="GET", body={}) {
    if (method == "GET") {
      return await RequestInterface.sendGetRequest(target);
    }
    return await RequestInterface.sendPostRequest(target, method="POST", body);
  }
  
  static async sendGetRequest(target) {
    console.log("sending get request");
    let response = await fetch(target);
    return response.json();
  }

  static async sendPostRequest(target, method, body) {
    console.log("sending post request: " + body);

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
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    if (AuthInterface.isLoggedIn) {
      headers["Authorization"] = "Bearer " + AuthInterface.getAccessToken();
    }

    return headers;
  }
}

export default RequestInterface;