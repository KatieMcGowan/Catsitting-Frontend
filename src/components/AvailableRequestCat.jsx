import React, { useEffect, useState } from "react";
import Medications from "./Medications";
import AdditionalNotes from "./AdditionalNotes";
import CatQuery from "../queries/CatQuery";

const AvailableRequestCat = (props) => {
  const [cat, setCat] = useState({
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
    .then(cat => {
      setCat({
        catname: cat.catname,
        age: cat.age,
        breed: cat.breed,
        feeding: cat.feeding,
        personality: cat.personality,
        medication: cat.medication,
        additionalnotes: cat.additionalnotes,
      })
    })
  }, []);

  return (
    <div className="request-cat-wrapper"> 
      <p className="p-request-cat-header">{cat.catname}</p>
      <div className="request-demographics">
        <span>Age: {cat.age}</span>
        <span>Breed: {cat.breed}</span>
        <span>Personality: {cat.personality}</span>
      </div>
      <div className="request-cat-info">
        <div className="test-div">
        <p className="p-cat-header">Care Instructions</p>
          <div className="p-care-instructions">
            <p className="p-care-header">Feeding:</p>
            <p className="p-pills">- {cat.feeding}</p>
          </div>
          <div className="p-care-instructions">
            <p className="p-care-header">Medication:</p>
            {cat.medication.map((medication, index) => {
                return  <Medications
                          key={index}
                          medication={medication}
                        />  
              })}
          </div>  
          <div className="p-care-instructions">
            <p className="p-care-header">Additional Notes</p>
            {cat.additionalnotes.map((additionalnote, index) => {
                return  <AdditionalNotes
                          key={index}
                          additionalnote={additionalnote}
                        />  
              })}
          </div>  
        </div>
      </div>  
    </div>    
  )
}

export default AvailableRequestCat;