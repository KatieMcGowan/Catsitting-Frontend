import Cat from "./Cat";

const Cats = (props) => {
  //SORT BY NEWEST CATS ADDED
  const sortedCats = []
  
  for (let i = props.cats.length - 1; i >= 0; i-- ) {
    sortedCats.push(props.cats[i])
  };

  return(
    <div>
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