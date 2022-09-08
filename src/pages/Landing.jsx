import "./Landing.css"

const Landing = () => {
  return(
    <div className="landing-wrapper">
      <div className="landing-bubble">
        <h1 className="bubble-text">Your Neighborhood</h1>
        <h1 className="bubble-text">Catsitting App</h1>
      </div>
      <div className="landing-features">
        <div className="landing-request-catsitter">
          <h1>Request a Catsitter</h1>
          <p className="p-landing">Populate your profile with your cats and request catsitting sessions from your neighbors for those times you're out of town.</p>
        </div>
        <div className="landing-book-catsitting">
          <h1>Book a Catsitting</h1>
          <p className="p-landing">Help your neighbors out by browsing the available request board and accepting available catsitting requests. </p>
        </div>
      </div>  
    </div>
  );
};

export default Landing;