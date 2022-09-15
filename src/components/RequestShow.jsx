import React, { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom"
import UserQuery from "../queries/UserQuery";
import RequestQuery from "../queries/RequestQuery";
import RequestShowCat from "./RequestShowCat";

const RequestShowComponent = (props) => {
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
      if (request.creator === props.userId && request.accepted === false) {
        UserQuery.show(request.creator)
        .then(creator => {
          setRequest({
            start: dateConversion(request.start),
            end: dateConversion(request.end),
            creatorId: creator._id,
            accepted: request.accepted,
            cats: creator.cats,
          });
        });
      } else if (request.creator === props.userId && request.accepted === true) {
        UserQuery.show(request.creator)
        .then(creator => {
          UserQuery.show(request.catsitter)
          .then(catsitter => {
            setRequest({
              start: dateConversion(request.start),
              end: dateConversion(request.end),
              creatorId: creator._id,
              catsitterdisplayname: catsitter.displayname,
              catsitterapartment: catsitter.apartment,
              accepted: request.accepted,
              cats: creator.cats
            })
          })  
        })
      } else {
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
    console.log(request.start);
  },[props]);


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

  //CANCEL CATSITTING MODAL
  const [cancelModal, setModal] = useState(false)

  const toggleCancelModal = () => {
    if (cancelModal === false) {
      setModal(true)
    } else {
      setModal(false)
    }  
  };

  let creatorCatsitterSame = (props.userId === request.creatorId)
  
  return (
    <div className="request-show-pill">
      <div className="individual-request-wrapper">
        <div className="available-request-time-requester">
        <div className="requests-made-left">
          <p className="p-pills">{request.start}</p>
          <p className="p-pills">{request.end}</p>
        </div>
        {request.accepted === false &&
          <div className="requests-made-right">
            <p className="request-p-pills">Pending</p>
          </div>
        }
        {request.accepted === true && creatorCatsitterSame === true &&
          <div className="requests-made-right">
            <p className="request-p-pills">Accepted by: {request.catsitterdisplayname}</p>
            <p className="request-p-pills">Apartment #{request.catsitterapartment}</p>
          </div>  
        }
        {request.accepted === true && creatorCatsitterSame === false &&
          <div className="requests-made-right">
            <p className="request-p-pills">Posted by: {request.creatordisplayname}</p>
            <p className="request-p-pills">Apartment #{request.creatorapartment}</p>
          </div>
        } 
      </div>
        {request.cats.map((cat, index) => {
          return  <RequestShowCat
                    key={index}
                    cat={cat}
                  />
        })} 
        {creatorCatsitterSame &&
          <p className="p-accept-request" onClick={() => redirectToEdit()}>Edit Request</p>
        }
        {!creatorCatsitterSame  && cancelModal === false &&
          <p className="p-accept-request" onClick={() => toggleCancelModal()}>Cancel Catsitting</p>
        }
        {!creatorCatsitterSame && cancelModal === true &&
            <div>
            <p className="delete-confirm">Are you sure you want to cancel this catsitting?</p>
            <div className="delete-yes-no">
              <p className="cancel-catsitting" onClick={() => cancelCatsitting()}>Yes</p>
              <p className="cancel-catsitting" onClick={() => toggleCancelModal()}>No</p>
            </div>
          </div>
        } 
      </div>
    </div>
  );
};

export default RequestShowComponent;