import AvailableRequests from "./AvailableRequests";

const AvailableRequestsContainer = (props) => {
  return (
    <AvailableRequests
      availablerequests={props.availablerequests}
      user={props.user}
    />  
  )
};

export default AvailableRequestsContainer;