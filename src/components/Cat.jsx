import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import CatQuery from "../queries/CatQuery";

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
        <div>
          <p className="p-cat-header">{catObject.catname}</p>
          <div className="cats-left">
            <p className="p-pills">Age: {catObject.age}</p>
            <p className="p-pills">Breed: {catObject.breed}</p>
            <p className="p-pills">Personality: {catObject.personality}</p>
          </div>
        </div>
        <div>  
          <p className="p-cat-header">Care Instructions</p>
          <div className="cats-right">
            <div className="p-care-instructions">
              <p className="p-care-header">Feeding:</p>
              <p className="p-pills">{catObject.feeding}</p>
            </div>
            <div className="p-care-instructions">
              <p className="p-care-header">Medication:</p>
              <p className="p-pills">{catObject.medication}</p>
            </div>  
            <div className="p-care-instructions">
              <p className="p-care-header">Additional Notes:</p>
              <p className="p-pills">{catObject.additionalnotes}</p>
            </div>  
          </div>
        </div>  
      </div>
      <Link to={`/dashboard/${catObject.id}/edit`} className="p-update-cat">Update cat info</Link>
    </div>  
  );
};

export default Cat;