import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CatQuery from "../queries/CatQuery"
import "./AddCat.css";

const AddCat = (props) => {
  // AUTH CHECK
  let navigate = useNavigate();

  const authCheck = () => {
    if (!props.auth.loggedIn) {
      navigate("/login")
    } else return;
  };

  useEffect(() => {
    authCheck()
  }, []);

  const [medications, setMedication] = useState([])

  const [additionalNotes, setNotes] = useState([])

  const [state, setState] = useState({
    catname: "",
    age: "",
    breed: "",
    feeding: "",
    user: props.auth.userId,
    personality: "",
  });
  
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
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
    let newState = state;
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
    if (state.personality === "") {
      newState.personality = "Friendly"
    }
    console.log(newState)
    CatQuery.create(newState)
    .then(data => {
      navigate("/dashboard/profile")
    })
  };


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
      </form>  
    </div>
  )
}

export default AddCat;