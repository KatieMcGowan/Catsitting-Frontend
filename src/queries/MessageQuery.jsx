// require("dotenv").config();

// const url = process.env.HITAIL_APP_SERVER_API;

const url = "https://poppyseed-tidal-109743.onrender.com"

class MessageQuery {
  static all = () => {
    return fetch(`${url}/messages`)
    .then(response => response.json())
    .then(jsonData => jsonData.messages)
    .catch(err => console.log(err))
  };

  static show = (id) => {
    return fetch(`${url}/messages/${id}`)
    .then(response => response.json())
    .then(jsonData => jsonData.message)
    .catch(err => console.log(err))
  };

  static create = (messageData) => {
    return fetch (`${url}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageData)
    })
    .then(response => response.json())
  };
};

export default MessageQuery;