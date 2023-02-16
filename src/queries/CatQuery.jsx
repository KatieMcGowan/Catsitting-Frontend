const url = `https://peaceful-violetblooms-486731.onrender.com`

class CatQuery {
  static all = () => {
    return fetch(`${url}/cats`)
    .then(response => response.json())
    .then(jsonData => jsonData.cats)
    .catch(err => console.log(err))
  };

  static show = (id) => {
    return fetch(`${url}/cats/${id}`)
    .then(response => response.json())
    .then(jsonData => jsonData.cat)
    .catch(err => console.log(err))
  };

  static create = (catData) => {
    return fetch (`${url}/cats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(catData)
    })
    .then(response => response.json())
    .catch(err => console.log(err))
  };
  
  static update = (id, catData) => {
    return fetch(`${url}/cats/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(catData)
    })
    .then(response => response.json())
  };

  static delete = (id) => {
    return fetch(`${url}/cats/${id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
  };
};

export default CatQuery;