import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CatsContainer from "../components/CatsContainer";
import UserQuery from "../queries/UserQuery";
import "./Profile.css"

const Profile = (props) => {
  const [profile, setProfile] = useState({
    displayname: "",
    username: "",
    apartment: "",
    cats: []
  });

  useEffect(() => {
    UserQuery.show(props.auth.userId)
    .then(data => {
      setProfile({
        displayname: data.displayname,
        username: data.username,
        apartment: data.apartment,
        cats: data.cats
      })
    })
  }, []);

  return(
  <div className="profile-wrapper">
      <h1>{profile.displayname} @{profile.username}</h1>
      <p className="p-profile-apartment-number">Apartment #{profile.apartment}</p>
      <div className="your-cats-wrapper">
        <div className="your-cats-header">
          <p className="p-your-cats">Your Cats</p>
          <Link to={"/dashboard/addcat"} className="addbutton">+</Link>
        </div>  
        <CatsContainer
          cats={profile.cats}
        />  
        {/* <div className="your-cat-pill">
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
          <div className="p-update-cat">Update cat info</div>
        </div> */}
      </div>
    </div>  
  );  
};

export default Profile;
