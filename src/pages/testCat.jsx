import React, { useState } from "react"

const TestCat = () => {
  const [medication, setMedication] = useState([
    { medication: "" }
  ])

  const [additionalNotes, setNotes] = useState([
    { additionalnotes: "" }
  ])

  const handleMedicationFormChange = (index, event) => {
    let data = [...medication]
    data[index][event.target.name] = event.target.value
    setMedication(data)
  };
  const handleNotesFormChange = (index, event) => {
    let data = [...additionalNotes]
    data[index][event.target.name] = event.target.value
    setNotes(data)
  };

  const addMedicationFields = () => {
    let newField = { medication: "" }
    setMedication([...medication, newField])
  }

  const addNotesFields = () => {
    let newField = { additionalnotes: "" }
    setMedication([...additionalNotes, newField])
  }
  
  const removeMedicationFields = (index) => {
    let data = [...medication]
    data.splice(index,1)
    setMedication(data)
  };
  
  const removeNotesFields = (index) => {
    let data = [...additionalNotes]
    data.splice(index,1)
    setNotes(data)
  };

  const medicationSubmit  = (e) => {
    e.preventDefault();
    console.log(medication)
  }

  const notesSubmit  = (e) => {
    e.preventDefault();
    console.log(additionalNotes)
  }
  
  return(
    <div>
      <form onSubmit={medicationSubmit}>
        {medication.map((medication, index) => {
          return(
            <div key={index}>
              <input
                name="medication"
                placeholder="Prescription"
                value={medication.medication}
                onChange={event => handleMedicationFormChange(index, event)}
              />
              <button onClick={() => removeMedicationFields(index)}>Remove</button>
            </div>
          )
        })}
        <button onClick={addMedicationFields}>+</button>
        <button onClick={medicationSubmit}>Submit</button>
      </form>
      <form onSubmit={notesSubmit}>
        {additionalNotes.map((additionalnote, index) => {
          return(
            <div key={index}>
              <input
                name="additionalnotes"
                placeholder="Likes catnip"
                value={additionalnote.additionalnotes}
                onChange={event => handleNotesFormChange(index, event)}
              />
              <button onClick={() => removeNotesFields(index)}>Remove</button>
            </div>
          )
        })}
        <button onClick={addMedicationFields}>+</button>
        <button onClick={notesSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default TestCat;