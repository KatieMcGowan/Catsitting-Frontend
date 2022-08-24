import React, { useState, useEffect } from "react";
import UserQuery from "../queries/UserQuery";
import AvailableRequestCat from "./AvailableRequestCat";

const AvailableRequest = (props) => {
  const [schedule, setSchedule] = useState({
    start: props.dateConversion(props.request.start),
    end: props.dateConversion(props.request.end)
  });

  const [user, setUser] = useState({
    creator: "",
    apartment: ""
  });

  useEffect(() => {
    UserQuery.show(props.request.creator)
    .then(user =>  console.log(user))
  }, [])

  console.log(props)

  //How am I supposed to approach multiple cat objects? 
  //Make a cat component and map ids

  return (
    <div className="individual-request-wrapper">
      <div className="requests-made-left">
        <p className="p-pills">{schedule.start}</p>
        <p className="p-pills">{schedule.end}</p>
      </div>
      <div className="requests-made-right">
        <p className="p-pills">Posted by: Paul</p>
        <p className="p-pills">Apartment #303</p>
      </div>
    </div>
  )
}

export default AvailableRequest