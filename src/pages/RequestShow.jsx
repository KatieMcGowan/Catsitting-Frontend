import { useParams } from "react-router-dom"
import RequestShowComponent from "../components/RequestShow"
import "./RequestShow.css"

const RequestShow = (props) => {
  let requestId = useParams().requestid
  let user = props.user.user;
  
  return(
    <div className="request-show-wrapper">
      <h1 className="requests-show-header">Request Details</h1>
      <div className="requests-available">
        <RequestShowComponent
          requestId={requestId}
          userId={user._id}
        />
      </div>  
    </div>
  /* <div className="your-cat-pill">
    <div className="individual-request-wrapper">
      <div className="requests-made-left">
          <p className="p-pills">November 10 - November 13</p>
        </div>
        <div className="requests-made-right">
          <p className="p-pills">Posted by: Paul</p>
          <p className="p-pills">Apartment #303</p>
        </div>
      </div>
    <div className="cat-info">
      <div>
        <p className="p-cat-header">Peanut</p>
        <div className="cats-left">
          <p className="p-pills">Age: 7</p>
          <p className="p-pills">Breed: Cornish Rex</p>
          <p className="p-pills">Personality: Shy, skittish</p>
        </div>
      </div>
      <div>  
        <p className="p-cat-header">Care Instructions</p>
        <div className="cats-right">
          <div className="p-care-instructions">
            <p className="p-care-header">Feeding</p>
            <p className="p-pills">Wet food twice a day at 8:00AM and PM</p>
          </div>
          <div className="p-care-instructions">
            <p className="p-care-header">Medication</p>
            <p className="p-pills">Muscle Relaxers before bed</p>
          </div>  
          <div className="p-care-instructions">
            <p className="p-care-header">Additional Notes</p>
            <p className="p-pills">She's afraid of plastic bag noises</p>
            <p className="p-pills">She loves catnip</p>
          </div>  
        </div>
      </div>  
    </div>
    <div className="p-cancel-edit-request">Cancel/Edit Request</div>
  </div>
</div> */
/* <h1 className="messages-header">Messages</h1>
<div className="messages-wrapper">
  <div className="messages-left">
    <div>
      <p className="message">Thank you for accepting. Meet in the lobby on 91/22 at noon for key handoff?</p>
      <p className="message-timestamp">August 17 @ 2:30PM</p>
    </div>  
  </div>
  <div className="messages-right">
    <p className="message">Sure, see you then!</p>
    <p className="message-timestamp">August 17 @ 2:45PM</p>
  </div>
</div> */
/* <div className="new-message-wrapper"> */
  /* <form className="new-message" onSubmit={handleSubmit}> */
    /* <input
      className="message-input"
      type="text"
      placeholder="Type your message here" */
      /* onChange={handleChange}
      value={message}
//       />  */
    /* <input type="submit" className="submit" value="Post"/>  
   </form> */
/* //   </div> */
/* // </div> */
  );
};    


export default RequestShow;