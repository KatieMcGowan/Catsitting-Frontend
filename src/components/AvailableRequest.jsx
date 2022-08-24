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
    apartment: "",
    cats: []
  });

  useEffect(() => {
    UserQuery.show(props.request.creator)
    .then(user => setUser({
      creator: user.displayname,
      apartment: user.apartment,
      cats: user.cats,
    }));
  }, [])

  return (
    <div className="individual-request-wrapper">
      <div className="requests-made-left">
        <p className="p-pills">{schedule.start}</p>
        <p className="p-pills">{schedule.end}</p>
      </div>
      <div className="requests-made-right">
        <p className="p-pills">Posted by: {user.creator}</p>
        <p className="p-pills">Apartment #{user.apartment}</p>
      </div>
      {user.cats.map((cat, index) => {
        return  <AvailableRequestCat
                  key={index}
                  cat={cat}
                />
      })}
    </div>
  )
}

export default AvailableRequest