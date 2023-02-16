import { Link, useNavigate } from "react-router-dom"

const Nav = (props) => {
  let navigate = useNavigate();

  const handleLogOut = () => {
    props.authSet(false, "")
    navigate("/")
  }
  
  return (
    <div className="nav">
      {props.loggedIn === false
      ? <Link className="nav-link" to ={"/"}><h2 className="nav-text">Home</h2></Link>
      : <Link className="nav-link" to={"/dashboard"}><h2 className="nav-text">Dashboard</h2></Link>
      }
      {props.loggedIn === false
      ? <Link className="nav-link" to ={"/login"}><h2 className="nav-text">Log In</h2></Link>
      : <Link className="nav-link" to={"/dashboard/profile"}><h2 className="nav-text">Profile</h2></Link>
      }
      {props.loggedIn === false
      ? <Link className="nav-link" to={"/signup"}><h2 className="nav-text-right">Sign Up</h2></Link>
      : <h2 className="nav-link nav-text-right" onClick={() => handleLogOut()}>Log Out</h2>
      }
    </div>
  )
}

export default Nav;