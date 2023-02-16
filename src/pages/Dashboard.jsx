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
      <h1 className="p-dashboard-header">Welcome, {user.displayname}!</h1>
      <p className="p-view-requests">View your neighborhood's catsitting requests</p>
      <div className="dashboard-items">
          <div className="requests-made-header">
            <p className="p-requests-dashboard">Requests Made</p>
            <Link to={"/dashboard/requests/new"} className="browse">Add Request</Link>
          </div>  
          {user.requestsmade.length === 0 
            ? <p className="no-requests">You haven't made any requests yet. Click the "Add Request" button above to make a request!</p>
            : <RequestsMadeContainer
                requestsmade={user.requestsmade}
              />  
          }
          <div className="requests-accepted-header">
            <p className="p-requests-dashboard">Requests Accepted</p>
            <Link to={"/dashboard/requests"} className="browse">Browse Requests</Link>
          </div>  
          {user.requestsaccepted.length === 0 
            ? <p className="no-requests">You haven't accepted any requests yet. Click the "Browse Requests" button above to view catsitting requests!</p>
            : <RequestsAcceptedContainer
                requestsaccepted={user.requestsaccepted}
              />  
          }
      </div>     
    </div>
  );
};

export default Dashboard;

