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
    <div className="request-cat-info">
      <div>
        <p className="p-cat-header">{cat.catname}</p>
        <div className="cats-left">
          <p className="p-pills">Age: {cat.age}</p>
          <p className="p-pills">Breed: {cat.breed}</p>
          <p className="p-pills">Personality: {cat.personality}</p>
        </div>
      </div>
      <div>  
        <p className="p-cat-header">Care Instructions</p>
        <div className="cats-right">
          <div className="p-care-instructions">
            <p className="p-care-header">Feeding</p>
            <p className="p-pills">{cat.feeding}</p>
          </div>
          <div className="p-care-instructions">
            <p className="p-care-header">Medication</p>
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