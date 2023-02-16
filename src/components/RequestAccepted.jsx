import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequestQuery from "../queries/RequestQuery";
import UserQuery from "../queries/UserQuery";

const RequestAccepted = (props) => {
  const [requestAccepted, setRequestAccepted] = useState({
    start: "",
    end: "",
    creatordisplayname: "",
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

    let navigate = useNavigate();

    const handleRequestClick = () => {
      navigate(`/dashboard/requests/${props.request}`)
    };

  return(
    <div className="requests-accepted-wrapper" onClick={() => handleRequestClick()}>
      <div className="requests-accepted-left">
        <p className="dashboard-p-pills">{requestAccepted.start}</p>
        <p className="dashboard-p-pills">{requestAccepted.end}</p>
      </div>
      <div className="requests-accepted-right">
        <p className="dashboard-p-pills">Posted by {requestAccepted.creatordisplayname}</p>
        <p className="dashboard-p-pills">Apartment #{requestAccepted.apartment}</p>
      </div>
    </div>  
  )
}

export default RequestAccepted;