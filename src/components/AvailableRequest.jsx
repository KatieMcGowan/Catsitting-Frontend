import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"
import UserQuery from "../queries/UserQuery";
import RequestQuery from "../queries/RequestQuery";
import AvailableRequestCat from "./AvailableRequestCat";

const AvailableRequest = (props) => {
  let navigate = useNavigate();

  //REQUEST STATE FOR DISPLAY
  const [schedule, setSchedule] = useState({
    start: props.dateConversion(props.request.start),
    end: props.dateConversion(props.request.end),
    id: props.request._id
  });

  //USER STATE FOR DISPLAY
  const [requester, setrequester] = useState({
    creatorId: "",
    creator: "",
    apartment: "",
    cats: []
  });
  
  useEffect(() => {
    UserQuery.show(props.request.creator)
    .then(requester => setrequester({
      creatorId: requester._id,
      creator: requester.displayname,
      apartment: requester.apartment,
      cats: requester.cats,
    }));
  }, [])

  //UPDATED REQUEST STATE TO SEND BACK
  const [request, setRequest] = useState({
    accepted: true,
    catsitter: props.user
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
        {props.user !== requester.creatorId 
          ? <p className="p-accept-request" onClick={() => handleAcceptRequest()}>Accept Request</p>
          : <Link to={`/dashboard/requests/${schedule.id}`}>View Request</Link>
        }
      </div>
    </div>
  )
}

export default AvailableRequest;