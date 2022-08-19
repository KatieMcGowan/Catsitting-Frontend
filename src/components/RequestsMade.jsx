import RequestMade from "./RequestMade";

const RequestsMade = (props) => {
  //SORT BY NEWEST REQUESTS MADE
  const sortedRequests = [];

  for (let i = props.requestsmade.length - 1; i >= 0; i-- ) {
    sortedRequests.push(props.requestsmade[i])
  }

  return(
    <div>
      {sortedRequests.map((requestmade) => {
        return  <RequestMade
                  key={requestmade._id}
                  request={requestmade}
                />
      })}
    </div>  
  );
};

export default RequestsMade;