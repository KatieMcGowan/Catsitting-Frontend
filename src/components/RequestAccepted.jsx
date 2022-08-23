import React, { useState, useEffect } from "react";
import RequestQuery from "../queries/RequestQuery";

const RequestAccepted = (props) => {

  const [requestAcceptedObject, setRequestAcceptedObject] = useState({
    start: "",
    end: "",
    accepted: "",
  });

  const dateConversion = (datestring) => {
    let dateDate = new Date (datestring)
    let ampm = "AM"
    let month = (dateDate.getMonth() + 1).toString();
    let date = dateDate.getDate().toString();
    let hours = dateDate.getHours();
    let minutes = dateDate.getMinutes()
    if (minutes < 10) {
      minutes = "0" + minutes
    };
    if (hours === 12) {
      hours = hours.toString()
      ampm = "PM"
    } else if (hours > 12) {
      hours = hours - 12;
      ampm = "PM"
    } else {
      hours = hours.toString()
    }
    return (month + "/" + date + " @" + hours + ":" + minutes + ampm)
  };

  useEffect(() => {
    RequestQuery.show(props.request)
    .then(requestaccepted => setRequestAcceptedObject({
      start: dateConversion(requestaccepted.start),
      end: dateConversion(requestaccepted.end),
      accepted: requestaccepted.accepted
    }));
  }, []);


  return(
    <div className="requests-accepted-wrapper">
      <div className="requests-accepted-left">
        <p className="p-pills">{requestAcceptedObject.start}</p>
        <p className="p-pills">{requestAcceptedObject.start}</p>
      </div>
      <div className="requests-accepted-right">
        <p className="p-pills">Posted by Ken</p>
        <p className="p-pills">Apartment #213</p>
      </div>
    </div>  
  )
}

export default RequestAccepted;