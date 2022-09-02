import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import RequestQuery from "../queries/RequestQuery"
import UserQuery from "../queries/UserQuery"
import "./NewRequest.css"

const NewRequest = (props) => {
  let navigate = useNavigate();

  const [state, setState] = useState({
    start: "",
    end: "",
    accepted: false,
    creator: props.auth.userId
  });

  const [user, setUser] = useState({
    cats: []
  })
  
  useEffect(() => {
    UserQuery.show(props.auth.userId)
    .then(user => {
      setUser({
        cats: user.cats
      })
    })
  }, []);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.cats.length === 0) {
      return;
    } else {
      RequestQuery.create(state)
      .then(data => {
        navigate("/dashboard")
      })
    };
  };

  return(
    <div className="new-request-wrapper">
      <div className="new-request-header">
        <h1>New Request</h1>
        <p className="p-new-request">Just tell us the start date and end date, and we'll populate your cat's information for you on the request!</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="new-request-form">
          <div className="new-request-form-input">
            <label htmlFor="startdate">Start Date</label>
            <input
              type="datetime-local"
              name="start"
              required={true}
              onChange={handleChange}
              value={state.start}
            />
          </div>
          <div className="new-request-form-input">  
          <label htmlFor="enddate">End Date</label>
            <input
              type="datetime-local"
              name="end"
              required={true}
              onChange={handleChange}
              value={state.end}
            />
          </div> 
          <div className="new-request-form-input">
            <input type="submit" className="submit" value="Request"/>
          </div>
        </div>  
      </form>
      {user.cats.length === 0 && 
      <p>No cats currently added to your profile. Click <Link to={"/dashboard/addcat"}>here</Link> to add a cat, then make a request.</p>
      }
    </div>
  );
};

export default NewRequest;