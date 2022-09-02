import React, { useState } from "react"

const TestCat = () => {
  const [state, setState] = useState({
    medication: [{}],
  });

  const handleFormChange = (index, event) => {
    let data = [...state.medication]
    data[index][event.target.name] = event.target.value
    setState(data)
  };

  console.log(state)
  return(
    <div>
      <form>
        {state.medication.map((medication, index) => {
          return(
            <div key={index}>
              <input
                name="medication"
                placeholder="prescription"
                value={state.medication}
                onChange={event => handleFormChange(index, event)}
              />
            </div>
          )
        })}
      </form>
    </div>
  )
}

export default TestCat;