import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom";
import UserQuery from "../queries/UserQuery"
import "./SignUp.css"

const SignUp = () => {
  let navigate = useNavigate();

  //INPUT STATE FOR USER CREATION
  const [state, setState] = useState({
    displayname: "",
    apartment: "",
    username: "",
    password: "",
  })

  //USERS STATE FOR VALIDATING IF USERNAME OR APARTMENT ALREADY EXISTS
  const [users, setUsers] = useState({})

  //STATES FOR DISPLAYING ERRORS
  const [userNameError, setUsernameError] = useState(false)

  const [apartmentError, setApartmentError] = useState(false)

  useEffect(() => {
    UserQuery.all()
    .then(data => {
      setUsers({
        users: data
      });
    });
  }, []);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setUsernameError(false);
    setApartmentError(false);
    for (let i = 0; i < users.users.length; i++ ){
      if (users.users[i].username === state.username) {
        setUsernameError(true)
        return;
      } else if (users.users[i].apartment === state.apartment) {
        setApartmentError(true)
        return;
      } 
    }
    UserQuery.create(state)
      .then(data => {
      navigate("/login")
      })
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  return(
    <div className="signup-wrapper">
      <div className="signup-header">
        <h1 className="p-signup-header">Sign Up</h1>
        <p className="p-signup">Create an account with us to view your neighbor's catsitting requests and request catsitting from your neighbors. Upon account creation, you will be redirected to the login page.</p>
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
              type="number"
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
            <input type="submit" className="submit" value="Submit"/>
          </div>
        </form>
        <p className={userNameError ? "error" : "no-error"}>Username has already been taken, please choose a different one.</p>
        <p className={apartmentError ? "error" : "no-error"}>Apartment Number has already been claimed, please choose a different one.</p>
        <p className="p-account">Already have an account with us?</p>
        <p className="p-account">Click <Link className="p-login-link" to={"/login"}>here</Link> to log in!</p>
      </div>
    </div>
  );
};

export default SignUp;