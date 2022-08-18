import "./NewRequest.css"

const EditRequest = () => {
  return(
    <div className="new-request-wrapper">
      <div className="new-request-header">
        <h1>Edit Request</h1>
        <p className="p-new-request">Be sure to communicate request changes to your catsitter, and make sure your cat's info is up to date on your profile!</p>
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
            <input type="submit" className="submit" value="Update Request"/>
          </div>
        </div>  
      </form>
      <p className="delete-request">Delete Request</p>
    </div>
  );
};

export default EditRequest;