class RequestInterface {

  static async sendRequest(target, method="GET", body={}) {
    if (method == "GET") {
      return await RequestInterface.sendGetRequest(target);
    }
    return await RequestInterface.sendPostRequest(target, method="POST", body);
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
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(body),
    });

    return response.json();
  }
}

export default RequestInterface;