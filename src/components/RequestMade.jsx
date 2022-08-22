import React, { useState, useEffect } from "react";
import RequestQuery from "../queries/RequestQuery";

const RequestMade = (props) => {
  const [requestMadeObject, setRequestMadeObject] = useState({
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
    .then(requestmade => setRequestMadeObject({
      start: dateConversion(requestmade.start),
      end: dateConversion(requestmade.end),
      accepted: requestmade.accepted
    }));
  }, []);

  return(
    <div className="requests-made-wrapper">
      <div className="requests-made-left">
        <p className="p-pills">{requestMadeObject.start}</p>
        <p className="p-pills">{requestMadeObject.end}</p>
      </div>
      <div className="requests-made-right">
        <p className="p-pills">Accepted by Darryl</p>
        <p className="p-pills">Apartment #303</p>
      </div>
    </div>
  )
}

export default RequestMade;