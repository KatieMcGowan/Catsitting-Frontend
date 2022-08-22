import RequestMade from "./RequestMade";

const RequestsMade = (props) => {
  //SORT BY NEWEST REQUESTS MADE
  const sortedRequests = [];

  for (let i = props.requestsmade.length - 1; i >= 0; i-- ) {
    sortedRequests.push(props.requestsmade[i])
  };

  console.log(sortedRequests)

  return(
    <div>
      {sortedRequests.map((requestmade, index) => {
        return  <RequestMade
                  key={index}
                  request={requestmade}
                />
      })}
    </div>  
  );
};

export default RequestsMade;