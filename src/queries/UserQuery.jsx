require("dotenv").config();

const url = process.env.HITAIL_APP_SERVER_API;
// const url = "https://poppyseed-tidal-109743.onrender.com"

class UserQuery {
  static all = () => {
    return fetch(`${url}/users`)
    .then(response => response.json())
    .then(jsonData => jsonData.users)
    .catch(err => console.log(err))
  };

  static show = (id) => {
    return fetch(`${url}/users/${id}`)
    .then(response => response.json())
    .then(jsonData => jsonData.user)
    .catch(err => console.log(err))
  };

  static create = (userData) => {
    return fetch (`${url}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
  };

  static update = (id, userData) => {
    return fetch(`${url}/users/${id}`, {
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