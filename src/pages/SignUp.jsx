import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import UserQuery from "../queries/UserQuery"
import "./SignUp.css"

const SignUp = () => {
  let navigate = useNavigate();

  const [state, setState] = useState({
    displayname: "",
    apartment: "",
    username: "",
    password: "",
  })

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    UserQuery.create(state)
    .then(data => {
      navigate("/")
    })
  };

  return(
    <div className="signup-wrapper">
      <div className="signup-header">
        <h1>Sign Up</h1>
        <p className="p-signup">Create an account with us to view your neighbor's catsitting requests and request catsitting from your neighbors.</p>
      </div>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <div className="signup-form-input">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="displayname"
              minLength="1"
              maxLength="20"
              required={true}
              onChange={handleChange}
              value={state.firstname}
            />
          </div>
          <div className="signup-form-input">
            <label htmlFor="apartment">Apartment Number</label>
            <input
              type="text"
              name="apartment"
              minLength="1"
              maxLength="3"
              required={true}
              onChange={handleChange}
              value={state.apartment}
            />
          </div>
          <div className="signup-form-input">
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
          <div className="signup-form-input">
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
          <div className="signup-form-input">
            <input type="submit" className="submit" value="Create User"/>
          </div>
        </form>
        <Link to={"/login"}><p className="p-login-link">Already have an account with us? Click here to log in!</p></Link>
      </div>
    </div>
  );
};

export default SignUp;