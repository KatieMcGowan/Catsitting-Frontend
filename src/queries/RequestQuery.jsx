const url = `https://serene-anchorage-09864.herokuapp.com/requests`

class RequestQuery {
  static all = () => {
    return fetch(`${url}`)
    .then(response => response.json())
    .then(jsonData => jsonData.requests)
    .catch(err => console.log(err))
  };

  static show = (id) => {
    return fetch(`${url}/${id}`)
    .then(response => response.json())
    .then(jsonData => jsonData.request)
    .catch(err => console.log(err))
  };

  static create = (requestData) => {
    return fetch (`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
  };
  
  static update = (id, requestData) => {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
  };

  static delete = (id) => {
    return fetch(`${url}/${id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
  };
};

export default RequestQuery;