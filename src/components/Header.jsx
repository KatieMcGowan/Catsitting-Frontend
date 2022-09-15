import Nav from "./Nav"
import "./Header.css"
import logo from "../components/hitail_logo.png"


const Header = (props) => {
  return(
    <div className="header">
      <div className="left">
        <img src={logo} className="logo-image" alt="logo"></img>
        <h2 className="nav-text">HiTail</h2>
      </div>  
      <Nav 
        loggedIn={props.auth.loggedIn}
        authSet={props.authSet}
      />
    </div>
  );
};

export default Header;