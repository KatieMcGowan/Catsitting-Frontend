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
      ? <Link className="nav-link" to ={"/"}><h2>Home</h2></Link>
      : <Link className="nav-link" to={"/dashboard"}><h2>Dashboard</h2></Link>
      }
      {props.loggedIn === false
      ? <Link className="nav-link" to ={"/login"}><h2>Log In</h2></Link>
      : <Link className="nav-link" to={"/dashboard/profile"}><h2>Profile</h2></Link>
      }
      {props.loggedIn === false
      ? <Link className="nav-link" to={"/signup"}><h2>Sign Up</h2></Link>
      : <h2 className="nav-link" onClick={() => handleLogOut()}>Log Out</h2>
      }
    </div>
  )
}

export default Nav;