import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import UserQuery from "../queries/UserQuery";
import RequestQuery from "../queries/RequestQuery";

const RequestShowComponent = (props) => {
  let navigate = useNavigate();

  //REQUEST STATES FOR DISPLAY
  const [request, setRequest] = useState({
    start: "",
    end: "",
    creatorid: "",
    creatordisplayname: "",
    creatorapartment: "",
    catsitterdisplayname: "",
    catsitterapartment: "",
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
    RequestQuery.show(props.requestId)
    .then(request => {
      if(request.creator === props.userId && request.accepted === false) {
        setRequest({
          start: dateConversion(request.start),
          end: dateConversion(request.end),
          creatorid: props.userId,
          accepted: false,
        })
      } else if (request.creator === props.userId && request.accepted === true) {
          UserQuery.show(request.catsitter)
          .then(catsitter => {
            setRequest({
              start: dateConversion(request.start),
              end: dateConversion(request.end),
              creatorid: props.userId,
              catsitterdisplayname: catsitter.displayname,
              catsitterapartment: catsitter.apartment,
              accepted: true,
            })
          })  
      } else {
        UserQuery.show(request.creator)
        .then(creator => {
          setRequest({
            start: dateConversion(request.start),
            end: dateConversion(request.end),
            creatorid: creator._id,
            creatordisplayname: creator.displayname,
            creatorapartment: creator.apartment,
            accepted: true,
          })
        })
      }
    })
  }, [])

  let creatorCatsitterSame = (props.userId === request.creatorid)

  console.log(creatorCatsitterSame);

  return (
    <div className="your-cat-pill">
      <div className="individual-request-wrapper">
        <div className="requests-made-left">
          <p className="p-pills">{request.start}</p>
          <p className="p-pills">{request.end}</p>
        </div>
        {request.accepted === false &&
          <div className="requests-made-right">
            <p className="p-pills">Pending</p>
          </div>
        }
        {request.accepted === true && creatorCatsitterSame === true &&
          <div className="requests-made-right">
            <p className="p-pills">Accepted by: {request.catsitterdisplayname}</p>
            <p className="p-pills">Apartment #{request.catsitterapartment}</p>
          </div>  
        }
        {request.accepted === true && creatorCatsitterSame === false &&
          <div className="requests-made-right">
            <p className="p-pills">Posted by: {request.creatordisplayname}</p>
            <p className="p-pills">Apartment #{request.creatorapartment}</p>
          </div>
        }  
        {/* {requester.cats.map((cat, index) => {
          return  <AvailableRequestCat
                    key={index}
                    cat={cat}
                  />
        })} */}
        {/* <p className="p-accept-request">Accept Request</p> */}
      </div>
    </div>
  )
}

export default RequestShowComponent