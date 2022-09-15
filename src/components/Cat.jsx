import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import Medications from "./Medications";
import CatQuery from "../queries/CatQuery";
import AdditionalNotes from "./AdditionalNotes";

const Cat = (props) => {
  const [catObject, setCatObject] = useState({
    catname: "",
    age: "",
    breed: "",
    feeding: "",
    personality: [],
    medication: [],
    additionalnotes: [],
  });

  useEffect(() => {
    CatQuery.show(props.cat)
    .then(cat => setCatObject({
      catname: cat.catname,
      age: cat.age,
      breed: cat.breed,
      feeding: cat.feeding,
      personality: cat.personality,
      medication: cat.medication,
      additionalnotes: cat.additionalnotes,
      id: cat._id,
    }))
  }, []);
  
  return(
    <div className="your-cat-pill">
      <p className="p-cat-name">{catObject.catname}</p>
      <div className="demographics">
        <span>Age: {catObject.age}</span>
        <span>Breed: {catObject.breed}</span>
        <span>Personality: {catObject.personality}</span>
      </div>
      <div className="cat-info">
        <div className="test-div">
        <p className="p-cat-header">Care Instructions</p>
          <div className="p-care-instructions">
            <p className="p-care-header">Feeding:</p>
            <p className="p-pills">{catObject.feeding}</p>
          </div>
          <div className="p-care-instructions">
            <p className="p-care-header">Medication:</p>
            {catObject.medication.map((medication, index) => {
              return  <Medications
                        key={index}
                        medication={medication}
                      />  
            })}
            </div>  
            <div className="p-care-instructions">
              <p className="p-care-header">Additional Notes:</p>
              {catObject.additionalnotes.map((additionalnote, index) => {
                return  <AdditionalNotes
                          key={index}
                          additionalnote={additionalnote}
                        />  
              })}
            </div>  
        </div>
        </div>  
      <Link to={`/dashboard/${catObject.id}/edit`} className="p-update-cat">Update cat info</Link>
    </div>  
  );
};

export default Cat;