import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import UserQuery from "../queries/UserQuery"
import "./LogIn.css"

const LogIn = (props) => {
  let navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: ""
  })

  const [users, setUsers] = useState({})

  useEffect(() => {
    UserQuery.all()
    .then(data => {
      setUsers({
        users: data
      });
    });
  }, []);
  
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let i = 0; i < users.users.length; i++ ){
      if (users.users[i].username === state.username && users.users[i].password === state.password) {
        let userid = users.users[i]._id
        props.authSet(true,userid)
        navigate("/dashboard")
      };
    };
  };

  return(
    <div className="login-wrapper">
      <div className="login-header">
        <h1>Log In</h1>
        <p className="p-login">Log in to your account to view your neighbor's catsitting requests and request catsitting from your neighbors.</p>
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="login-form-input">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              minLength="4"
              maxLength="25"
              required={true}
              onChange={handleChange}
              value={state.username}
            />
          </div>
          <div className="login-form-input">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              minLength="4"
              maxLength="30"
              required={true}
              onChange={handleChange}
              value={state.password}
            />
          </div>
          <div className="login-form-input">
            <input type="submit" className="submit" value="Log In"/>
          </div>
        </form>
        <p className="p-signup-link">Don't have an account with us? Click here to sign up!</p>
      </div>
    </div>
  );
};

export default LogIn