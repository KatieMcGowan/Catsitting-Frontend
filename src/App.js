import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AddCat from "./pages/AddCat";
import AvailableRequests from "./pages/AvailableRequests";
import Dashboard from "./pages/Dashboard";
import EditCat from "./pages/EditCat";
import Landing from "./pages/Landing";
import LogIn from "./pages/LogIn";
import NewRequest from "./pages/NewRequest";
import Profile from "./pages/Profile";
import RequestShow from "./pages/RequestShow";
import SignUp from "./pages/SignUp";
import EditRequest from "./pages/EditRequest";
//PAGE FOR TESTING OUT HOW TO INPUT MEDICATION/ADDITIONAL NOTES
import TestCat from "./pages/testCat";

const App = () => {
  //AUTH STATES
  const [auth, setAuth] = useState({
    loggedIn: false,
    userId: ""
  })

  //AUTH FUNCTION
  const authSet = (boolean, user) => {
    setAuth({
      loggedIn: boolean,
      userId: user
    });
  };

  return (
    <div>
      <Header auth={auth} authSet={authSet}/>
      <Routes>
        <Route exact path={"/"} element={<Landing />} />
        <Route path={"/login"} element={<LogIn authSet={authSet}/>} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/dashboard"} element={<Dashboard auth={auth} />} />
        <Route path={"/dashboard/profile"} element={<Profile auth={auth} />} />
        <Route path={"/dashboard/:catid/edit"} element={<EditCat auth={auth} />} />
        <Route path={"/dashboard/addcat"} element={<AddCat auth={auth} />} />
        <Route path={"/dashboard/requests"} element={<AvailableRequests auth={auth} />} />
        <Route path={"/dashboard/requests/:requestid"} element={<RequestShow auth={auth} />} />
        <Route path={"/dashboard/requests/:requestid/edit"} element={<EditRequest auth={auth} />} />
        <Route path={"/dashboard/requests/new"} element={<NewRequest auth={auth} />} />
        <Route path={"/testcat"} element={<TestCat />} />
      </Routes>
    </div>  
  );
}

export default App;

//MASTER LIST OF THINGS TO CLEAN UP:
//>CSS formatting on pages
//>User auth not disappearing on refresh
//>Once an object is created, it not populating on redirected page
//>When cat object is deleted, profile populates an empty pill until user is logged out
//>Get placeholder start/end times to work for edit request page
//>Dashboard only shows two "request made" and "request accepted" objects even if there are more on the backend

//BIG FEATURE FIXES; 
//> CSS formatting on pages
//> Update schema to allow only two cats
//> Have error messages appear on cat creation page stating that only two cats are allowed
//> Do not allow users to delete a cat if a request is contigent on it. Prompt them to delete request then remove cat.
//> You should not be allowed to accept your own request
