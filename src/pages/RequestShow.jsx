import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import RequestShowComponent from "../components/RequestShow"
import UserQuery from "../queries/UserQuery";
import "./RequestShow.css"

const RequestShow = (props) => {
  console.log(props);
  console.log(props);
  let requestId = useParams().requestid

  const [state, setState] = useState({
    userId: "",
    cats: []
  })

  useEffect(() => {
    UserQuery.show(props.auth.userId)
    .then(data => {
      setState({
        userId: data._id,
        cats: data.cats
      })
    })
  }, [])

  return(
    <div className="request-show-wrapper">
      <h1 className="requests-show-header">Request Details</h1>
      <div className="requests-available">
        <RequestShowComponent
          requestId={requestId}
          userId={state.userId}
          cats={state.cats}

        />
      </div>  
    </div>
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