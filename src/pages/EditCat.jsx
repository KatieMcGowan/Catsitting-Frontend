import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CatQuery from "../queries/CatQuery"
import "./AddCat.css"

const EditCat = (props) => {
  // AUTH CHECK
  let navigate = useNavigate();
  
  const authCheck = () => {
    if (!props.auth.loggedIn) {
      navigate("/login")
    } else return;
  };
  
  let catId = useParams().catid;

  //PLACEHOLDER WITH OLD CAT STATE
  const [cat, setCat] = useState({
    catname: "",
    age: "",
    breed: "",
    feeding: "",
    personality: "",
  });

  //POPULATES FORM PLACEHOLDERS
  useEffect(() => {
    authCheck()
    CatQuery.show(catId)
    .then(cat => setCat({
      catname: cat.catname,
      age: cat.age,
      breed: cat.breed,
      feeding: cat.feeding,
      personality: cat.personality,
    }))
  }, []);

  //UPDATED REQUEST STATES TO SEND BACK
  const [updatedCat, setUpdatedCat] = useState({
    catname: "",
    age: "",
    breed: "",
    feeding: "",
    personality: "",
  });

  const [medications, setMedication] = useState([])

  const [additionalNotes, setNotes] = useState([])

    //MEDICATION AND ADDITIONAL NOTES FUNCTIONS
    const handleMedicationFormChange = (index, event) => {
      let data = [...medications]
      data[index][event.target.name] = event.target.value
      setMedication(data)
    };
  
    const handleNotesFormChange = (index, event) => {
      let data = [...additionalNotes]
      data[index][event.target.name] = event.target.value
      setNotes(data)
    };
  
    const addMedicationFields = () => {
      let newField = { medication: ""}
      setMedication([...medications, newField])
    }
  
    const addNotesFields = () => {
      let newField = { additionalnote: "" }
      setNotes([...additionalNotes, newField])
    }
    
    const removeMedicationFields = (index) => {
      let data = [...medications]
      data.splice(index,1)
      setMedication(data)
    };
    
    const removeNotesFields = (index) => {
      let data = [...additionalNotes]
      data.splice(index,1)
      setNotes(data)
    };  

  const handleChange = (event) => {
    setUpdatedCat({
      ...updatedCat,
      [event.target.name]: event.target.value
    });
  };

  //FUNCTIONS THAT PROHIBIT USER FROM CREATING EMPTY FIELDS
  const medicationEmptyCheck = () => {
    let splicedMedicationsArray = []
    for (let i = 0; i < medications.length; i++) {
      if (medications[i].medication !== "") {
        splicedMedicationsArray.push(medications[i])
      };
    };
    return splicedMedicationsArray
  }

  const notesEmptyCheck = () => {
    let splicedNotesArray = []
    for (let i = 0; i < additionalNotes.length; i++) {
      if (additionalNotes[i].additionalnote !== "") {
        splicedNotesArray.push(additionalNotes[i])
      };
    };
    return splicedNotesArray
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let newState = updatedCat;
    medicationEmptyCheck();
    if (medicationEmptyCheck().length === 0) {
      newState.medication = {medication: "N/A"}
    } else {
      newState.medication = medicationEmptyCheck();
    }
    notesEmptyCheck();
    if (notesEmptyCheck().length === 0) {
      newState.additionalnotes = {additionalnote: "N/A"}
    } else {
      newState.additionalnotes = notesEmptyCheck();
    }
    if (updatedCat.personality === "") {
      newState.personality = "Friendly"
    }
    CatQuery.update(catId, newState)
    .then(data => {
      navigate("/dashboard/profile")
    })
  };

    //DELETE FUNCTIONALITY
  const handleDelete = () => {
    CatQuery.delete(catId)
    .then(data => {
      navigate("/dashboard/profile")
    })
  };

  const [deleteModal, setModal] = useState(false)

  const toggleDeleteModal = () => {
    if (deleteModal === false) {
      setModal(true)
    } else {
      setModal(false)
    }  
  };

  return(
    <div className="add-cat-page-wrapper">
      <h1 className="add-cat-header">Edit Your Cat's Information</h1>
      <p className="p-add-cat">If your cat is included in any accepted catsitting requests, be sure to communicate any care changes to your catsitter.</p>
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
              <label htmlFor="personality">Personality</label>
              <select 
                name="personality" 
                value={updatedCat.personality}
                placeholder={cat.personality}
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
                placeholder={cat.feeding}
                minLength="1"
                maxLength="100"
                required={true}
                onChange={handleChange}
                value={updatedCat.feeding}
              />
            </div>
            <div className="new-cat-form-input">
              <div className="dynamic-care">
                <label htmlFor="medication">Medication</label>
                <p className="dynamic-button" onClick={addMedicationFields}>+</p>
              </div>
              {medications.map((medication, index) => {
                return(
                  <div className="dynamic-care" key={index}>
                    <input
                      type="text"
                      minLength="1"
                      maxLength="100"
                      name="medication"
                      value={medication.medication}
                      onChange={event => handleMedicationFormChange(index, event)}
                    />
                    <p className="dynamic-button" onClick={() => removeMedicationFields(index)}>-</p>
                  </div>
                )
              })}
            </div>
            <div className="new-cat-form-input">
              <div className="dynamic-care">
                <label htmlFor="additionalnotes">Additional Notes</label>
                <p className="dynamic-button" onClick={addNotesFields}>+</p>
              </div>
              {additionalNotes.map((additionalnote, index) => {
                return(
                  <div className="dynamic-care" key={index}>
                    <input
                      type="text"
                      minLength="1"
                      maxLength="100"
                      name="additionalnote"
                      value={additionalnote.additionalnote}
                      onChange={event => handleNotesFormChange(index, event)}
                    />
                    <p className="dynamic-button" onClick={() => removeNotesFields(index)}>-</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="new-cat-form-input"> 
          <input type="submit" className="submit" value="Submit"/>
        </div>
      {deleteModal === false
        ? <p className="delete-request" onClick={() => toggleDeleteModal()}>Remove Cat Info</p>
        : <div>
            <p className="delete-confirm">Are you sure you want to remove your cat's info?</p>
            <div className="delete-yes-no">
              <p className="confirm" onClick={() => handleDelete()}>Yes</p>
              <p className="confirm" onClick={() => toggleDeleteModal()}>No</p>
            </div>
          </div>
        }  
      </form>
    </div>
  )
}

export default EditCat;