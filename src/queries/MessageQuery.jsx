const config = require("../config")

class MessageQuery {
  static all = () => {
    return fetch(`${config.url}/messages`)
    .then(response => response.json())
    .then(jsonData => jsonData.messages)
    .catch(err => console.log(err))
  };

  static show = (id) => {
    return fetch(`${config.url}/messages/${id}`)
    .then(response => response.json())
    .then(jsonData => jsonData.message)
    .catch(err => console.log(err))
  };

  static create = (messageData) => {
    return fetch (`${config.url}/messages`, {
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