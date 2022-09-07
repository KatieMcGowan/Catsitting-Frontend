import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RequestQuery from "../queries/RequestQuery"
import "./NewRequest.css"

const EditRequest = (props) => {
  // AUTH CHECK
  let navigate = useNavigate();

  const authCheck = () => {
    if (!props.auth.loggedIn) {
      navigate("/login")
    } else return;
  };

  let requestId = useParams().requestid;

  //PLACEHOLDER WITH OLD REQUEST STATE
  const [request, setRequest] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    authCheck();
    RequestQuery.show(requestId)
    .then(request => {
      setRequest({
        start: request.start,
        end: request.end,
      })
    })
  }, []);

  //UPDATED REQUEST STATE TO SEND BACK
  const [updatedRequest, setUpdatedRequest] = useState({
    start: "",
    end: "",
  });
  
  const handleChange = (event) => {
    setUpdatedRequest({
      ...updatedRequest,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    RequestQuery.update(requestId, updatedRequest)
    .then(data => {
      navigate(`/dashboard/requests/${requestId}`)
    })
  };

  const handleDeleteRequest = () => {
    RequestQuery.delete(requestId)
    .then(data => {
      navigate("/dashboard/requests")
    });
  };

  return(
    <div className="new-request-wrapper">
      <div className="new-request-header">
        <h1>Edit Request</h1>
        <p className="p-new-request">Make sure your cat's info is up to date on your profile, and communicate any changes with your catsitter if your request has been accepted.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="new-request-form">
          <div className="new-request-form-input">
            <label htmlFor="startdate">Start Date</label>
            <input
              type="datetime-local"
              name="start"
              placeholder={request.start}
              required={true}
              onChange={handleChange}
              value={updatedRequest.start}
            />
          </div>
          <div className="new-request-form-input">  
          <label htmlFor="enddate">End Date</label>
            <input
              type="datetime-local"
              name="end"
              placeholder={request.end}
              required={true}
              min={updatedRequest.start}
              onChange={handleChange}
              value={updatedRequest.end}
            />
          </div> 
          <div className="new-request-form-input">
            <input type="submit" className="submit" value="Update Request"/>
          </div>
        </div>  
      </form>
      <p className="delete-request" onClick={() => handleDeleteRequest()}>Delete Request</p>
    </div>
  );
};

export default EditRequest;