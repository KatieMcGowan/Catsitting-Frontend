import React, {useState} from "react";
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
  //STATES
  const [auth, setAuth] = useState({
    loggedIn: false,
    userid: ""
  })

  //AUTH FUNCTION
  const authSet = (boolean, id) => {
    setAuth({
      loggedIn: boolean,
      userid: id
    });
  };

  console.log(auth);
  
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path={"/"} element={<Landing />} />
        <Route path={"/login"} element={<LogIn authSet={authSet}/>} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/dashboard"} element={<Dashboard auth={auth}/>} />
        <Route path={"/dashboard/:userid"} element={<Profile auth={auth}/>} />
        <Route path={"/dashboard/:userid/:catid/edit"} element={<EditCat auth={auth}/>} />
        <Route path={"/dashboard/:userid/addcat"} element={<AddCat auth={auth}/>} />
        <Route path={"/dashboard/requests"} element={<AvailableRequests auth={auth}/>} />
        <Route path={"/dashboard/requests/:requestid"} element={<RequestShow auth={auth}/>} />
        <Route path={"/dashboard/requests/:requestid/edit"} element={<EditRequest auth={auth}/>} />
        <Route path={"/dashboard/requests/new"} element={<NewRequest auth={auth}/>} />
      </Routes>
    </div>  
  );
}

export default App;
