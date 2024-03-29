import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import UserQuery from "../queries/UserQuery"
import "./LogIn.css"

const LogIn = (props) => {
  let navigate = useNavigate();

  //INPUT STATE FOR USER CREDENTIALS
  const [state, setState] = useState({
    username: "",
    password: ""
  })

  //USERS STATE FOR VALIDATION
  const [users, setUsers] = useState({})

  //STATE FOR DISPLAYING ERRORS
  const [error, setError] = useState(false)

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
        let user = users.users[i]._id
        props.authSet(true,user)
        navigate("/dashboard")
      } else {
        setError(true)
      }
    };
  };

  return(
    <div className="login-wrapper">
      <div className="login-header">
        <h1 className="p-login-header">Log In</h1>
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
              type="password"
              name="password"
              minLength="4"
              maxLength="30"
              required={true}
              onChange={handleChange}
              value={state.password}
            />
          </div>
          <div className="login-form-input">
            <input type="submit" className="submit" value="Submit"/>
          </div>
        </form>
        <p className={error ? "error" : "no-error"}>Invalid username or password, please try again.</p>
        <p className="p-account">Don't have an account with us?</p> 
        <p className="p-account">Click <Link className="p-signup-link" to={"/signup"}>here</Link> to sign up!</p>
      </div>
    </div>
  );
};

export default LogIn