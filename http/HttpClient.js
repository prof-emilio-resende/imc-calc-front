class HttpClient {
  static post(hostname, path, obj) {
    var opt = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };

    return fetch(`${hostname}${path}`, opt)
        .then(res => res.json());
  }
}
