import "./LogIn.css"

const LogIn = () => {
  return(
    <div className="login-wrapper">
      <div className="login-header">
        <h1>Log In</h1>
        <p className="p-login">Log in to your account to view your neighbor's catsitting requests and request catsitting from your neighbors.</p>
      </div>
      <div className="login-form">
        <form /*onSubmit={handleSubmit}*/>
          <div className="login-form-input">
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
          <div className="login-form-input">
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