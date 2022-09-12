import AvailableRequest from "./AvailableRequest";

const AvailableRequests = (props) => {
  //DATE CONVERSION FUNCTION TO MAKE ISO STRING LEGIBLE
  const dateConversion = (datestring) => {
    let dateDate = new Date (datestring)
    let ampm = "AM"
    let month = (dateDate.getMonth() + 1).toString();
    let date = dateDate.getDate().toString();
    let hours = dateDate.getHours();
    let minutes = dateDate.getMinutes()
    if (minutes < 10) {
      minutes = "0" + minutes
    };
    if (hours === 12) {
      hours = hours.toString()
      ampm = "PM"
    } else if (hours > 12) {
      hours = hours - 12;
      ampm = "PM"
    } else {
      hours = hours.toString()
    }
    return (month + "/" + date + " @" + hours + ":" + minutes + ampm)
  };
  
  return(
    <div className="requests-available">
      {props.availablerequests.map((availablerequest, index) => {
        return  <AvailableRequest
                  key={index}
                  request={availablerequest}
                  dateConversion={dateConversion}
                  user={props.user}
                />
      })}
    </div>  
  );
}

export default AvailableRequests