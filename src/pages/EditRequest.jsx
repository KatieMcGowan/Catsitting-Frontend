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

  //DELETE FUNCTIONALITY
  const handleDeleteRequest = () => {
    RequestQuery.delete(requestId)
    .then(data => {
      navigate("/dashboard/requests")
    });
  };

  const [deleteModal, setModal] = useState(false)

  const toggleDeleteModal = () => {
    if (deleteModal === false) {
      setModal(true)
    } else {
      setModal(false)
    }  
  };

  return(
    <div className="new-request-wrapper">
      <div className="new-request-header">
        <h1 className="p-new-request-header">Edit Request</h1>
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
            <input type="submit" className="submit" value="Submit"/>
          </div>
        </div>  
        {deleteModal === false
        ? <p className="delete-request" onClick={() => toggleDeleteModal()}>Cancel Request</p>
        : <div>
            <p className="delete-confirm">Are you sure you want to cancel this request?</p>
            <div className="delete-yes-no">
              <p className="confirm" onClick={() => handleDeleteRequest()}>Yes</p>
              <p className="confirm" onClick={() => toggleDeleteModal()}>No</p>
            </div>
          </div>
        }
      </form>
    </div>
  );
};

export default EditRequest;