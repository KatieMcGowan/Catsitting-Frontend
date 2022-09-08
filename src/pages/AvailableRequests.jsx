import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequestQuery from "../queries/RequestQuery"
import AvailableRequestsContainer from "../components/AvailableRequestsContainer";
import "./AvailableRequests.css"

const AvailableRequests = (props) => {
  // AUTH CHECK
  let navigate = useNavigate();

  const authCheck = () => {
    if (!props.auth.loggedIn) {
      navigate("/login")
    } else return;
  };

  const [availableRequests, setAvailableRequests] = useState([]);

  useEffect(() => {
    authCheck();
    let available = []
    RequestQuery.all()
    .then(requests => {
      for (let i = 0; i < requests.length; i++) {
        if (requests[i].accepted === false) {
          available.push(requests[i])
        }
      }
    })
    .then(() => setAvailableRequests(available))
  }, []);

  return(
    <div className="available-requests-wrapper">
      <h1 className="available-requests-header">Available Requests</h1>
        {availableRequests.length === 0 
            ? <p className="no-requests">No available requests</p> 
            : <AvailableRequestsContainer availablerequests={availableRequests} user={props.auth.userId}/>}  
    </div>
  )
}

export default AvailableRequests;