import React from "react";
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

const App = () => {

  //TRY TO PASS USERID AS A PROP INTO EACH PAGE
  //HAVE FUNCTION ON LOGIN PAGE THAT RETURNS USERID
  
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path={"/"} element={<Landing />} />
        <Route path={"/login"} element={<LogIn />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/dashboard/:userid"} element={<Profile />} />
        <Route path={"/dashboard/:userid/:catid/edit"} element={<EditCat />} />
        <Route path={"/dashboard/:userid/addcat"} element={<AddCat />} />
        <Route path={"/dashboard/requests"} element={<AvailableRequests />} />
        <Route path={"/dashboard/requests/:requestid"} element={<RequestShow />} />
        <Route path={"/dashboard/requests/:requestid/edit"} element={<EditRequest />} />
        <Route path={"/dashboard/requests/new"} element={<NewRequest />} />
      </Routes>
    </div>  
  );
}

export default App;
