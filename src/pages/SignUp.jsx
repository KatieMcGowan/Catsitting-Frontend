import "./SignUp.css"

const SignUp = () => {
  return(
    <div className="signup-wrapper">
      <div className="signup-header">
        <h1>Sign Up</h1>
        <p className="p-signup">Create an account with us to view your neighbor's catsitting requests and request catsitting from your neighbors.</p>
      </div>
      <div className="signup-form">
        <form /*onSubmit={handleSubmit}*/>
          <div className="signup-form-input">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              minLength="1"
              maxLength="20"
              required={true}
              /*onChange={handleChange}
              value={state.firstname}*/
            />
          </div>
          <div className="signup-form-input">
            <label htmlFor="apartmentnumber">Apartment Number</label>
            <input
              type="text"
              name="apartmentnumber"
              minLength="3"
              maxLength="3"
              required={true}
              /*onChange={handleChange}
              value={state.apartmentnumber}*/
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
              /*onChange={handleChange}
              value={state.username}*/
            />
          </div>
          <div className="signup-form-input">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              minLength="4"
              maxLength="30"
              required={true}
              /*onChange={handleChange}
              value={state.password}*/
            />
          </div>
          <div className="signup-form-input">
            <input type="submit" className="submit" value="Create User"/>
          </div>
        </form>
        <p className="p-login-link">Already have an account with us? Click here to log in!</p>
      </div>
    </div>
  );
};

export default SignUp;