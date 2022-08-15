import "./Landing.css"

const Landing = () => {
  return(
    <div className="landing-wrapper">
      <div className="landing-bubble">
        <h1>Your Neighborhood</h1>
        <h1>Catsitting App</h1>
      </div>
      <div className="landing-features">
        <div className="landing-request-catsitter">
          <h1>Request a Catsitter</h1>
          <p className="p-landing">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="landing-book-catsitting">
          <h1>Book a Catsitting</h1>
          <p className="p-landing">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>
      </div>  
    </div>
  );
};

export default Landing;