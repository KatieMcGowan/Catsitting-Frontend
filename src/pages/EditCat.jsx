import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CatQuery from "../queries/CatQuery"
// import Select from "react-select"
import "./AddCat.css"

const EditCat = () => {
  let navigate = useNavigate();
  let catId = useParams().catid

  const [cat, setCat] = useState({
    catname: "",
    age: "",
    breed: "",
    feeding: "",
    personality: [],
    medication: [],
    additionalnotes: [],
  });

  //POPULATES FORM PLACEHOLDERS
  useEffect(() => {
    CatQuery.show(catId)
    .then(cat => setCat({
      catname: cat.catname,
      age: cat.age,
      breed: cat.breed,
      feeding: cat.feeding,
      personality: cat.personality,
      medication: cat.medication,
      additionalnotes: cat.additionalnotes,
    }))
  }, []);

  const [updatedCat, setUpdatedCat] = useState({
    catname: "",
    age: "",
    breed: "",
    feeding: "",
    personality: [],
    medication: [],
    additionalnotes: [],
  });

  const handleChange = (event) => {
    setUpdatedCat({
      ...updatedCat,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    CatQuery.update(catId, updatedCat)
    .then(data => {
      navigate("/dashboard/profile")
    })
  };

  const handleDelete = () => {
    CatQuery.delete(catId)
    .then(data => {
      navigate("/dashboard")
    })
  }

  // const options = [
  //   {value: "friendly", label: "Friendly"},
  //   {value: "shy", label: "Shy"},
  //   {value: "playful", label: "Playful"},
  // ];

  return(
    <div>
      <h1 className="add-cat-header">Edit Your Cat's Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-cat-wrapper">
          <div className="about-your-cat">
            <h1 className="about-your-cat-header">About Your Cat</h1>
            <div className="new-cat-form-input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="catname"
                placeholder={cat.catname}
                minLength="1"
                maxLength="20"
                required={true}
                onChange={handleChange}
                value={updatedCat.catname}
              />
            </div>
            <div className="new-cat-form-input">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                name="age"
                placeholder={cat.age}
                minLength="1"
                maxLength="2"
                required={true}
                onChange={handleChange}
                value={updatedCat.age}
              />
            </div>
            <div className="new-cat-form-input">
              <label htmlFor="breed">Breed</label>
              <input
                type="text"
                name="breed"
                placeholder={cat.breed}
                minLength="4"
                maxLength="25"
                required={true}
                onChange={handleChange}
                value={updatedCat.breed}
              />
            </div>
            <div className="new-cat-form-input">
              <label htmlFor="personality">Personality (select up to three)</label>
              {/* <Select 
                options={options}
                name="personality"
                onChange={handleChange}
                value={state.personality}
              /> */}
            </div>
          </div>
          <div className="care-instructions">
            <h1 className="care-instructions-header">Care Instructions</h1>
            <div className="new-cat-form-input">
              <label htmlFor="feeding">Feeding</label>
              <input
                type="text"
                name="feeding"
                placeholder={cat.feeding}
                minLength="1"
                maxLength="100"
                required={true}
                onChange={handleChange}
                value={updatedCat.feeding}
              />
            </div>
            <div className="new-cat-form-input">
              <label htmlFor="medication">Medication</label>
              <input
                type="text"
                name="medication"
                placeholder={cat.medication}
                minLength="0"
                maxLength="100"
                required={false}
                onChange={handleChange}
                value={updatedCat.medication}
              /> 
            </div>
            <div className="new-cat-form-input">
              <label htmlFor="additionalnotes">Additional Notes</label>
              <input
                type="text"
                name="additionalnotes"
                placeholder={cat.additionalnotes}
                minLength="0"
                maxLength="100"
                required={false}
                onChange={handleChange}
                value={updatedCat.additionalnotes}
              /> 
            </div> 
          </div>
        </div>
        <div className="new-cat-form-input"> 
          <input type="submit" className="submit" value="Edit Cat"/>
        </div>
      </form>
      <p className="remove-cat" onClick={() => handleDelete()}>Remove your cat's information</p>  
    </div>
  )
}

export default EditCat;