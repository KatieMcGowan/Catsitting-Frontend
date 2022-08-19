import { Link } from "react-router-dom"

const Nav = () => {
  return(
    <div className="nav">
      <Link to={"/"}><h2>Landing</h2></Link>
      <Link to ={"/login"}><h2>Log In</h2></Link>
      <Link to={"/signup"}><h2>Sign Up</h2></Link>
      <Link to={"/dashboard"}><h2>Dashboard</h2></Link>
      <Link to={"/dashboard/profile"}><h2>Profile</h2></Link>
      <Link to={"/dashboard/addcat"}><h2>Add Cat</h2></Link>
      <Link to={"/dashboard/:catid/edit"}><h2>Edit Cat</h2></Link>
      <Link to={"/dashboard/requests"}><h2>Available Requests</h2></Link>
      <Link to={"/dashboard/requests/:requestid"}><h2>Show Request</h2></Link>
      <Link to={"/dashboard/requests/:requestid/edit"}><h2>Edit Request</h2></Link>
      <Link to={"/dashboard/requests/new"}><h2>New Request</h2></Link>
    </div>
  )
}

export default Nav;