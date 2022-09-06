import React, { useState, useEffect } from "react";
import RequestQuery from "../queries/RequestQuery"
import AvailableRequestsContainer from "../components/AvailableRequestsContainer";
import "./AvailableRequests.css"

const AvailableRequests = (props) => {
  const [availableRequests, setAvailableRequests] = useState([]);

  useEffect(() => {
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
      {/* <div className="requests-available"> */}
        {/* <div className="your-cat-pill"> */}
        {availableRequests.length === 0 
            ? <p className="no-requests">No available requests</p> 
            : <AvailableRequestsContainer availablerequests={availableRequests} user={props.auth.userId}/>}  
          {/* <div className="cat-info">
            <div>
              <p className="p-cat-header">Peanut</p>
              <div className="cats-left">
                <p className="p-pills">Age: 7</p>
                <p className="p-pills">Breed: Cornish Rex</p>
                <p className="p-pills">Personality: Shy, skittish</p>
              </div>
            </div>
            <div>  
              <p className="p-cat-header">Care Instructions</p>
              <div className="cats-right">
                <div className="p-care-instructions">
                  <p className="p-care-header">Feeding</p>
                  <p className="p-pills">Wet food twice a day at 8:00AM and PM</p>
                </div>
                <div className="p-care-instructions">
                  <p className="p-care-header">Medication</p>
                  <p className="p-pills">Muscle Relaxers before bed</p>
                </div>  
                <div className="p-care-instructions">
                  <p className="p-care-header">Additional Notes</p>
                  <p className="p-pills">She's afraid of plastic bag noises</p>
                  <p className="p-pills">She loves catnip</p>
                </div>  
              </div>
            </div>  
          </div>
        <div className="p-accept-request">Accept Request</div> */}
        {/* </div> */}
      {/* </div> */}
    </div>
  )
}

export default AvailableRequests;