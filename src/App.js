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
import "./App.css";

const App = () => {
  //AUTH STATE
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
    <div className="app">
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
      </Routes>
    </div>  
  );
}

export default App;

//BIG FEATURE FIXES; 
//> User auth not disappearing on refresh
//> Get placeholder start/end times to work for edit request page
//> Update schema to allow only two cats
//> Have error messages appear on cat creation page stating that only two cats are allowed
//> Do not allow users to delete a cat if a request is contigent on it. Prompt them to delete request then remove cat.
//> Messaging system
//> Sorting requests by most upcoming. 