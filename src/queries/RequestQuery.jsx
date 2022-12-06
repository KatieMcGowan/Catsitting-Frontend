import url from "../config";

class RequestQuery {
  static all = () => {
    return fetch(`${url}/requests`)
    .then(response => response.json())
    .then(jsonData => jsonData.requests)
    .catch(err => console.log(err))
  };

  static show = (id) => {
    return fetch(`${url}/requests/${id}`)
    .then(response => response.json())
    .then(jsonData => jsonData.request)
    .catch(err => console.log(err))
  };

  static create = (requestData) => {
    return fetch (`${url}/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
  };
  
  static update = (id, requestData) => {
    return fetch(`${url}/requests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
  };

  static delete = (id) => {
    return fetch(`${url}/requests/${id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
  };
};

export default RequestQuery;