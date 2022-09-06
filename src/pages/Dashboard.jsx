import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RequestsMadeContainer from "../components/RequestsMadeContainer";
import RequestsAcceptedContainer from "../components/RequestsAcceptedContainer";
import "./Dashboard.css";
import UserQuery from "../queries/UserQuery";

const Dashboard = (props) => {
  const [user, setUser] = useState({
    displayname: "",
    requestsmade: [],
    requestsaccepted: [],
  });

  // AUTH CHECK
  let navigate = useNavigate();

  const authCheck = () => {
    if (!props.auth.loggedIn) {
      navigate("/login")
    } else return;
  };

  useEffect(() => {
    authCheck();
    UserQuery.show(props.auth.userId)
    .then (user => {
      setUser({
        displayname: user.displayname,
        requestsmade: user.requested,
        requestsaccepted: user.accepted,
      });
    });
  }, []);

  return(
    <div className="dashboard-wrapper">
      <h1>Welcome, {user.displayname}!</h1>
      <p className="p-view-requests">View your neighborhood's catsitting requests</p>
      <div className="dashboard-items">
          <div className="requests-made-header">
            <p className="p-requests-dashboard">Requests Made</p>
            <Link to={"/dashboard/requests/new"} className="addbutton">+</Link>
          </div>  
          {user.requestsmade.length === 0 
            ? <p className="no-requests">You haven't made any requests yet. Click <Link className="dashboard-here" to={"/dashboard/requests/new"}>here </Link> to add a request!</p>
            : <RequestsMadeContainer
                requestsmade={user.requestsmade}
              />  
          }
          <div className="requests-accepted-header">
            <p className="p-requests-dashboard">Requests Accepted</p>
            <Link to={"/dashboard/requests"} className="browse">Browse</Link>
          </div>  
          {user.requestsaccepted.length === 0 
            ? <p className="no-requests">You haven't accepted any requests yet. Click <Link className="dashboard-here" to={"/dashboard/requests"}>here</Link> to view catsitting requests!</p>
            : <RequestsAcceptedContainer
                requestsaccepted={user.requestsaccepted}
              />  
          }
      </div>     
    </div>
  );
};

export default Dashboard;

