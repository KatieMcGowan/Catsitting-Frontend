import RequestAccepted from "./RequestAccepted";

const RequestsAccepted = (props) => {
  return(
    <div className="pill-wrapper">
      {props.requestsaccepted.map((requestaccepted, index) => {
        return  <RequestAccepted
                  key={index}
                  request={requestaccepted}
                />
      })}
    </div>  
  );
};

export default RequestsAccepted;