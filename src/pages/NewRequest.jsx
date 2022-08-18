import "./NewRequest.css"

const NewRequest = () => {
  return(
    <div className="new-request-wrapper">
      <div className="new-request-header">
        <h1>New Request</h1>
        <p className="p-new-request">Just tell us the start date and end date, and we'll populate your cat's information for you on the request!</p>
      </div>
      <form /*onSubmit={handleSubmit}*/>
        <div className="new-request-form">
          <div className="new-request-form-input">
            <label htmlFor="startdate">Start Date</label>
            <input
              type="date"
              name="startdate"
              required={true}
              /*onChange={handleChange}
              value={state.startdate}*/
            />
          </div>
          <div className="new-request-form-input">  
          <label htmlFor="enddate">End Date</label>
            <input
              type="date"
              name="enddate"
              required={true}
              /*onChange={handleChange}
              value={state.enddate}*/
            />
          </div> 
          <div className="new-request-form-input">
            <input type="submit" className="submit" value="Request"/>
          </div>
        </div>  
      </form>
    </div>
  );
};

export default NewRequest;