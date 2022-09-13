import Nav from "./Nav"
import "./Header.css"

const Header = (props) => {
  return(
    <div className="header">
      <div className="left">
        <div className="placeholder"></div>
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