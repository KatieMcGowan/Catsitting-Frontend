import RequestMade from "./RequestMade";

const RequestsMade = (props) => {
  return(
    <div className="pill-wrapper">
      {props.requestsmade.map((requestmade, index) => {
        return  <RequestMade
                  key={index}
                  request={requestmade}
                />
      })}
    </div>  
  );
};

export default RequestsMade;