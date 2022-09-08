import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import RequestQuery from "../queries/RequestQuery"
import UserQuery from "../queries/UserQuery"
import "./NewRequest.css"

const NewRequest = (props) => {
  // AUTH CHECK
  let navigate = useNavigate();

  const authCheck = () => {
    if (!props.auth.loggedIn) {
      navigate("/login")
    } else return;
  };

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
    authCheck()
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
    RequestQuery.create(state)
    .then(data => {
      navigate("/dashboard")
    });
  };

  return(
    <div className="new-request-wrapper">
      <div className="new-request-header">
        <h1 className="p-new-request-header">New Request</h1>
        <p className="p-new-request">Just tell us the start date and end date, and we'll populate your cat's information for you on the request!</p>
      </div>
      {user.cats.length === 0 
        ? <p className="no-cat-for-request">No cats currently added to your profile. Click <Link className="add-cat-from-request" to={"/dashboard/addcat"}>here</Link> to add a cat, then make a request.</p>
        : <form onSubmit={handleSubmit}>
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
                  min={state.start}
                  onChange={handleChange}
                  value={state.end}
                />
              </div> 
              <div className="new-request-form-input">
                <input type="submit" className="submit" value="Submit"/>
              </div>
            </div>  
          </form>
      }
    </div>
  );
};

export default NewRequest;