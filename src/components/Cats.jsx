import { Link } from "react-router-dom"
import Cat from "./Cat";

const Cats = (props) => {
  //SORT BY NEWEST CATS ADDED
  const sortedCats = []
  
  for (let i = props.cats.length - 1; i >= 0; i-- ) {
    sortedCats.push(props.cats[i])
  };

  return(
    <div className="your-cats-wrapper">
      <div className="your-cats-header">
        <p className="p-your-cats">Your Cats</p>
        <Link to={"/dashboard/addcat"} className="browse">Add Cat</Link>
      </div>
      {sortedCats.length === 0 &&
        <p className="no-requests">You haven't added any cats to your profile. Click the "Add Cat" button above to add a cat to your profile!</p>
      }  
      {sortedCats.map((cat, index) => {
        return  <Cat
                  key={index}
                  cat={cat}
                />  
      })}
    </div>
  );
};

export default Cats;