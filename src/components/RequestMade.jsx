import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequestQuery from "../queries/RequestQuery";
import UserQuery from "../queries/UserQuery"

const RequestMade = (props) => {
  const [requestMade, setRequestMade] = useState({
    start: "",
    end: "",
    accepted: "",
    catsitterdisplayname: "",
    apartment: "",
  });

  const dateConversion = (datestring) => {
    let slicedString = datestring.slice(0, 23)
    let dateObject = new Date(slicedString);
    let ampm = "AM"
    let month = (dateObject.getMonth() + 1).toString();
    let date = dateObject.getDate().toString();
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes()
    if (minutes < 10) {
      minutes = "0" + minutes
    };
    if (hours === 12) {
      hours = hours.toString()
      ampm = "PM"
    } else if (hours === 0) {
      hours = hours + 12
      ampm = "AM"
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

    let navigate = useNavigate();

    const handleRequestClick = () => {
      navigate(`/dashboard/requests/${props.request}`)
    };

    return(
    <div className="requests-made-wrapper" onClick={() => handleRequestClick()}>
      <div className="requests-made-left">
        <p className="dashboard-p-pills">{requestMade.start}</p>
        <p className="dashboard-p-pills">{requestMade.end}</p>
      </div>
        {requestMade.accepted === false
          ? <div className="requests-made-right">
              <p className="dashboard-p-pills">Pending</p>
            </div>  
          : <div className="requests-made-right">
              <p className="dashboard-p-pills">Accepted by {requestMade.catsitterdisplayname}</p>
              <p className="dashboard-p-pills">Apartment #{requestMade.apartment}</p>
            </div>   
        }
    </div>
  )
}

export default RequestMade;  