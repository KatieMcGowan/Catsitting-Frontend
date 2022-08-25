import React, { useState, useEffect } from "react";
import RequestQuery from "../queries/RequestQuery";
import UserQuery from "../queries/UserQuery"

const RequestMade = (props) => {
  const [requestMade, setRequestMade] = useState({
    start: "",
    end: "",
    accepted: "",
    catsitter: "",
    catsitterdisplayname: "",
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
    .then(requestmade => {
      if(requestmade.accepted === true) {
        UserQuery.show(requestmade.catsitter)
        .then(catsitter => {
          setRequestMade({
            start: dateConversion(requestmade.start),
            end: dateConversion(requestmade.end),
            accepted: requestmade.accepted,
            catsitter: requestmade.catsitter,
            catsitterdisplayname: catsitter.displayname,
            apartment: catsitter.apartment
          })
        })
      } else {
        setRequestMade({
          start: dateConversion(requestmade.start),
          end: dateConversion(requestmade.end),
          accepted: requestmade.accepted
        })
      }  
    })}, []);

    return(
    <div className="requests-made-wrapper">
      <div className="requests-made-left">
        <p className="p-pills">{requestMade.start}</p>
        <p className="p-pills">{requestMade.end}</p>
      </div>
        {requestMade.accepted === false
          ? <div className="requests-made-right">
              <p className="p-pills">Pending</p>
            </div>  
          : <div className="requests-made-right">
              <p className="p-pills">Accepted by {requestMade.catsitterdisplayname}</p>
              <p className="p-pills">Apartment #{requestMade.apartment}</p>
            </div>   
        }
    </div>
  )
}

export default RequestMade;  