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
      <div className="cat-info">
        <div className="cats-left-wrapper">
          <p className="p-cat-header">{catObject.catname}</p>
          <div className="cats-left">
            <p className="p-pills">Age: {catObject.age}</p>
            <p className="p-pills">Breed: {catObject.breed}</p>
            <p className="p-pills">Personality: {catObject.personality}</p>
          </div>
        </div>
        <div className="cats-middle"></div>
        <div className="cats-right-wrapper">  
          <p className="p-cat-header">Care Instructions</p>
          <div className="cats-right">
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
      </div>
      <Link to={`/dashboard/${catObject.id}/edit`} className="p-update-cat">Update cat info</Link>
    </div>  
  );
};

export default Cat;