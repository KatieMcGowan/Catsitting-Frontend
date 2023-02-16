import Cats from "./Cats";

const CatsContainer = (props) => {
  return(
      <Cats
        cats={props.cats}
      />
  )
};

export default CatsContainer;