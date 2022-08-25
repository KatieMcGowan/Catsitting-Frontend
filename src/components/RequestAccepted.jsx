import React, { useState, useEffect } from "react";
import RequestQuery from "../queries/RequestQuery";
import UserQuery from "../queries/UserQuery";

const RequestAccepted = (props) => {
  const [requestAccepted, setRequestAccepted] = useState({
    start: "",
    end: "",
    creator: "",
    creatordisplayname: "",
    apartment: "",
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
    .then(requestaccepted => {
      UserQuery.show(requestaccepted.creator)
        .then(creator => {
          setRequestAccepted({
            start: dateConversion(requestaccepted.start),
            end: dateConversion(requestaccepted.end),
            creatordisplayname: creator.displayname,
            apartment: creator.apartment,
          })
        })
      })
    }, []);    

  return(
    <div className="requests-accepted-wrapper">
      <div className="requests-accepted-left">
        <p className="p-pills">{requestAccepted.start}</p>
        <p className="p-pills">{requestAccepted.end}</p>
      </div>
      <div className="requests-accepted-right">
        <p className="p-pills">Posted by {requestAccepted.creatordisplayname}</p>
        <p className="p-pills">Apartment #{requestAccepted.apartment}</p>
      </div>
    </div>  
  )
}

export default RequestAccepted;