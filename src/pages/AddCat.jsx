import Select from "react-select"
import "./AddCat.css"

const AddCat = () => {

  const options = [
    {value: "friendly", label: "Friendly"},
    {value: "shy", label: "Shy"},
    {value: "playful", label: "Playful"},
  ];

  return(
    <div>
      <h1 className="add-cat-header">Add a Cat to Your Profile</h1>
      <form>
        <div className="add-cat-wrapper">
          <div className="about-your-cat">
            <h1 className="about-your-cat-header">About Your Cat</h1>
            <div className="new-cat-form-input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                minLength="1"
                maxLength="20"
                required={true}
                /*onChange={handleChange}
                value={state.name}*/
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
                /*onChange={handleChange}
                value={state.age}*/
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
                /*onChange={handleChange}
                value={state.breed}*/
              />
            </div>
            <div className="new-cat-form-input">
              <label htmlFor="personality">Personality (select up to three)</label>
              <Select 
                options={options}
                name="personality"
                /*onChange={handleChange}
                value={state.personality}*/
              />
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
                /*onChange={handleChange}
                value={state.breed}*/
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
                /*onChange={handleChange}
                value={state.breed}*/
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
                /*onChange={handleChange}
                value={state.breed}*/
              /> 
            </div> 
          </div>
        </div>
        <div className="new-cat-form-input"> 
          <input type="submit" value="Add Cat"/>
        </div>
      </form>  
    </div>
  )
}

export default AddCat;