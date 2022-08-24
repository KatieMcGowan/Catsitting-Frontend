import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import UserQuery from "../queries/UserQuery";
import RequestQuery from "../queries/RequestQuery";
import AvailableRequestCat from "./AvailableRequestCat";

const AvailableRequest = (props) => {
  let navigate = useNavigate();

  //REQUEST STATES FOR DISPLAY
  const [schedule, setSchedule] = useState({
    start: props.dateConversion(props.request.start),
    end: props.dateConversion(props.request.end),
    id: props.request._id
  });

  const [requester, setrequester] = useState({
    creator: "",
    apartment: "",
    cats: []
  });
  
  useEffect(() => {
    UserQuery.show(props.request.creator)
    .then(requester => setrequester({
      creator: requester.displayname,
      apartment: requester.apartment,
      cats: requester.cats,
    }));
  }, [])

  //REQUEST OBJECT STATE FOR UPDATE
  const [request, setRequest] = useState({
    accepted: true,
    catsitter: props.user.user._id,
  })

  const handleAcceptRequest = () => {
    RequestQuery.update(schedule.id, request)
    .then(data => {
      navigate("/dashboard")
    });
  };

  return (
    <div className="your-cat-pill">
      <div className="individual-request-wrapper">
        <div className="requests-made-left">
          <p className="p-pills">{schedule.start}</p>
          <p className="p-pills">{schedule.end}</p>
        </div>
        <div className="requests-made-right">
          <p className="p-pills">Posted by: {requester.creator}</p>
          <p className="p-pills">Apartment #{requester.apartment}</p>
        </div>
        {requester.cats.map((cat, index) => {
          return  <AvailableRequestCat
                    key={index}
                    cat={cat}
                  />
        })}
        <p className="p-accept-request" onClick={() => handleAcceptRequest()}>Accept Request</p>
      </div>
    </div>
  )
}

export default AvailableRequest;