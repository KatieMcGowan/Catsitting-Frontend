const config = require("../config")

class UserQuery {
  static all = () => {
    return fetch(`${config.url}/users`)
    .then(response => response.json())
    .then(jsonData => jsonData.users)
    .catch(err => console.log(err))
  };

  static show = (id) => {
    return fetch(`${config.url}/users/${id}`)
    .then(response => response.json())
    .then(jsonData => jsonData.user)
    .catch(err => console.log(err))
  };

  static create = (userData) => {
    return fetch (`${config.url}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
  };

  static update = (id, userData) => {
    return fetch(`${config.url}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
  };

};

export default UserQuery;