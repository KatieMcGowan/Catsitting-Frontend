import RequestAccepted from "./RequestAccepted";

const RequestsAccepted = (props) => {
  //SORT BY NEWEST REQUESTS MADE
  const sortedRequestsAccepted = [];

  for (let i = props.requestsaccepted.length - 1; i >= 0; i-- ) {
    sortedRequestsAccepted.push(props.requestsaccepted[i])
  };

  return(
    <div>
      {sortedRequestsAccepted.map((requestaccepted, index) => {
        return  <RequestAccepted
                  key={index}
                  request={requestaccepted}
                />
      })}
    </div>  
  );
};

export default RequestsAccepted;