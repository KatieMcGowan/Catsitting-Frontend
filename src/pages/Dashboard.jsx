import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom";
import RequestsMadeContainer from "../components/RequestsMadeContainer";

import "./Dashboard.css"

const Dashboard = (props) => {
  let user = props.user.user
  
  const [state, setState] = useState({
    requestsmade: user.requested,
    requestsaccepted: user.accepted,
  });
  
  //AUTH CHECK
  let navigate = useNavigate();

  const authCheck = () => {
    if (!props.auth.loggedIn) {
      navigate("/login")
    } else return;
  };

  useEffect(() => {
    authCheck();
  })

//BE SURE TO CHANGE NAV AT LANDING/LOG IN LEVEL TO NOT HAVE DASHBOARD ITEMS BECAUSE IT TRIPS UP STATE
//WILL HAVE TO FIND A WAY TO DO AUTH CHECK OUTSIDE USEEFFECT IN CASE SOMEONE MANUALLY TYPES IN URL

  return(
    <div className="dashboard-wrapper">
      <h1>Welcome, {user.displayname}!</h1>
      <p className="p-view-requests">View your neighbor's catsitting requests</p>
      <div className="dashboard-items">
        <div className="pill-wrapper">
        <div className="requests-made-header">
          <p className="p-requests-dashboard">Requests Made</p>
          <Link to={"/dashboard/requests/new"} className="addbutton">+</Link>
        </div>  
          <div className="requests-made-wrapper">
            <RequestsMadeContainer
              requestsmade={state.requestsmade}
            />  
            <div className="requests-made-left">
              <p className="p-pills">November 10 - November 13</p>
            </div>
            <div className="requests-made-right">
              <p className="p-pills">Accepted by Darryl</p>
              <p className="p-pills">Apartment #303</p>
            </div>
          </div>
          <div className="requests-made-wrapper">
            <div className="requests-made-left">
              <p className="p-pills">December 22 - December 23</p>
            </div>
            <div className="requests-made-right">
              <p className="p-pills">Pending</p>
            </div>
          </div>
        </div>
        {/* <div className="pill-wrapper">
          <div className="requests-accepted-header">
            <p className="p-requests-dashboard">Requests Accepted</p>
          </div>  
          <div className="requests-accepted-wrapper">
            <div className="requests-accepted-left">
              <p className="p-pills">September 2 - September 2</p>
            </div>
            <div className="requests-accepted-right">
              <p className="p-pills">Posted by Ken</p>
              <p className="p-pills">Apartment #213</p>
            </div>
          </div>  
          <div className="requests-accepted-wrapper">
            <div className="requests-accepted-left">
              <p className="p-pills">October 3 - October 4</p>
            </div>
            <div className="requests-accepted-right">
              <p className="p-pills">Posted by Lin</p>
              <p className="p-pills">Apartment #133</p>
            </div>
          </div>
        </div> */}
      </div>     
    </div>
  )
}

export default Dashboard;