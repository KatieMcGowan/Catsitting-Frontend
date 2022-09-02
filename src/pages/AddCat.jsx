import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CatQuery from "../queries/CatQuery"
import "./AddCat.css";

const AddCat = (props) => {
  let navigate = useNavigate();

  //CAT OBJECT STATE
  const [state, setState] = useState({
    catname: "",
    age: "",
    breed: "",
    feeding: "",
    user: props.auth.userId,
    personality: "",
    medication: "",
    additionalnotes: "",
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    CatQuery.create(state)
    .then(data => {
      navigate("/dashboard/profile")
    })
  };

  return(
    <div>
      <h1 className="add-cat-header">Add a Cat to Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-cat-wrapper">
          <div className="about-your-cat">
            <h1 className="about-your-cat-header">About Your Cat</h1>
            <div className="new-cat-form-input">
              <label htmlFor="catname">Name</label>
              <input
                type="text"
                name="catname"
                minLength="1"
                maxLength="20"
                required={true}
                onChange={handleChange}
                value={state.catname}
              />
            </div>
            <div className="new-cat-form-input">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                name="age"
                minLength="1"
                maxLength="2"
                required={true}
                onChange={handleChange}
                value={state.age}
              />
            </div>
            <div className="new-cat-form-input">
              <label htmlFor="breed">Breed</label>
              <input
                type="text"
                name="breed"
                minLength="4"
                maxLength="25"
                required={true}
                onChange={handleChange}
                value={state.breed}
              />
            </div>
            <div className="new-cat-form-input">
              <label htmlFor="personality">Personality</label>
              <select
                name="personality"
                value={state.personality}
                onChange={handleChange}
              >
                <option value="Friendly">Friendly</option>
                <option value="Shy">Shy</option>
                <option value="Playful">Playful</option>
                <option value="Skittish">Skittish</option>
                <option value="Lazy">Lazy</option>
                <option value="Mischievous">Mischievous</option>
                <option value="Vocal">Vocal</option>
                <option value="Quiet">Quiet</option>
                <option value="Fearful">Fearful</option>
                <option value="Antisocial">Antisocial</option>
                <option value="Cuddly">Cuddly</option>
                <option value="Needy">Needy</option>
              </select>
            </div>
          </div>
          <div className="care-instructions">
            <h1 className="care-instructions-header">Care Instructions</h1>
            <div className="new-cat-form-input">
              <label htmlFor="feeding">Feeding</label>
              <input
                type="text"
                name="feeding"
                minLength="1"
                maxLength="100"
                required={true}
                onChange={handleChange}
                value={state.feeding}
              />
            </div>
            <div className="new-cat-form-input">
              <label htmlFor="medication">Medication</label>
              <input
                type="text"
                name="medication"
                minLength="0"
                maxLength="100"
                required={false}
                onChange={handleChange}
                value={state.medication}
              /> 
            </div>
            <div className="new-cat-form-input">
              <label htmlFor="additionalnotes">Additional Notes</label>
              <input
                type="text"
                name="additionalnotes"
                minLength="0"
                maxLength="100"
                required={false}
                onChange={handleChange}
                value={state.additionalnotes}
              /> 
            </div> 
          </div>
        </div>
        <div className="new-cat-form-input"> 
          <input type="submit" className="submit" value="Add Cat"/>
        </div>
      </form>  
    </div>
  )
}

export default AddCat;