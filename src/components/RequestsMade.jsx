import RequestMade from "./RequestMade";

const RequestsMade = (props) => {
  //SORT BY NEWEST REQUESTS MADE

  const sortedRequestsMade = [];

  for (let i = props.requestsmade.length - 1; i >= 0; i-- ) {
    sortedRequestsMade.push(props.requestsmade[i])
  };
  
  return(
    <div>
      {sortedRequestsMade.map((requestmade, index) => {
        return  <RequestMade
                  key={index}
                  request={requestmade}
                />
      })}
    </div>  
  );
};

export default RequestsMade;