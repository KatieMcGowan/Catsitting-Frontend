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
        <Link to={"/dashboard/addcat"} className="addbutton">+</Link>
      </div>  
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