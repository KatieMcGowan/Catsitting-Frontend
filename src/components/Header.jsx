import Nav from "./Nav"
import "./Header.css"

const Header = () => {
  return(
    <div className="header">
      <div className="left">
        <div className="placeholder"></div>
        <h2>Catsitting</h2>
      </div>  
      <Nav />
    </div>
  );
};

export default Header;