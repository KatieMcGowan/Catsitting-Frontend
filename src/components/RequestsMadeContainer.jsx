// import React, { useState, useEffect } from "react";
import RequestsMade from "./RequestsMade";

const RequestsMadeContainer = (props) => {
  console.log(props);
  return (
    <RequestsMade
      requestsmade={props.requestsmade}
    />  
  )
};

export default RequestsMadeContainer;