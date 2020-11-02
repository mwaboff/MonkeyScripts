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
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      redirect: 'manual',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(body),
    });

    return response.json();
  }
}

export default RequestInterface;