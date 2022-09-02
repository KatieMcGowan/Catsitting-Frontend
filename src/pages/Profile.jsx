import React, { useState, useEffect } from "react";
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
      <CatsContainer
        cats={profile.cats}
      />  
    </div>  
  );  
};

export default Profile;
