import React, { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom"
import UserQuery from "../queries/UserQuery";
import RequestQuery from "../queries/RequestQuery";
import RequestShowCat from "./RequestShowCat";

const RequestShowComponent = (props) => {
  console.log(props);
  let navigate = useNavigate();
  
  //REQUEST STATE FOR DISPLAY
  const [request, setRequest] = useState({
    start: "",
    end: "",
    creatorId: "",
    creatordisplayname: "",
    creatorapartment: "",
    catsitterdisplayname: "",
    catsitterapartment: "",
    accepted: "",
    cats: [],
  });

  //REQUEST STATE FOR CATSITTER CANCEL (UPDATES REQUEST OBJECT)
  const [updatedRequest, setUpdatedRequest] = useState({
    accepted: false,
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
        console.log("Creator catsitter same, request not accepted")
        setRequest({
          start: dateConversion(request.start),
          end: dateConversion(request.end),
          creatorId: props.userId,
          accepted: false,
          cats: props.userCats,
        })
      } else if (request.creator === props.userId && request.accepted === true) {
        console.log("Creator catsitter same, request accepted")
          UserQuery.show(request.catsitter)
          .then(catsitter => {
            setRequest({
              start: dateConversion(request.start),
              end: dateConversion(request.end),
              creatorId: props.userId,
              catsitterdisplayname: catsitter.displayname,
              catsitterapartment: catsitter.apartment,
              accepted: true,
              cats: props.userCats
            })
          })  
      } else {
        console.log("Creator catsitter not the same")
        UserQuery.show(request.creator)
        .then(creator => {
          UserQuery.show(request.catsitter)
          .then(catsitter => {
            setRequest({
              start: dateConversion(request.start),
              end: dateConversion(request.end),
              creatorId: creator._id,
              creatordisplayname: creator.displayname,
              creatorapartment: creator.apartment,
              catsitterdisplayname: catsitter.displayname,
              catsitterapartment: catsitter.apartment,
              accepted: request.accepted,
              cats: creator.cats,
            })
          })
        })
      }  
    })
  },[]);

  console.log(request);
  
  //FUNCTIONS FOR USER INTERACTION WITH REQUEST OBJECT
  const redirectToEdit = () => {
    navigate(`/dashboard/requests/${props.requestId}/edit`)
  };

  const cancelCatsitting = () => {
    RequestQuery.update(props.requestId, updatedRequest)
    .then(data => {
      navigate("/dashboard")
    });
  };

  let creatorCatsitterSame = (props.userId === request.creatorId)
  
  return (
    <div className="your-cat-pill">
      <div className="individual-request-wrapper">
        <div className="available-request-time-requester">
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
      </div>
        {request.cats.map((cat, index) => {
          return  <RequestShowCat
                    key={index}
                    cat={cat}
                  />
        })} 
        {creatorCatsitterSame 
        ? <p className="p-accept-request" onClick={() => redirectToEdit()}>Edit Request</p>
        : <p className="p-accept-request" onClick={() => cancelCatsitting()}>Cancel Catsitting</p>
        }
      </div>
    </div>
  );
};

export default RequestShowComponent;