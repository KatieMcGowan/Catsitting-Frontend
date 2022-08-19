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
  //AUTH STATES
  const [auth, setAuth] = useState({
    loggedIn: false,
  })

  const [user, setUser] = useState({})

  //AUTH FUNCTION
  const authSet = (boolean, user) => {
    setAuth({
      loggedIn: boolean,
    });
    setUser({
      user
    });
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path={"/"} element={<Landing />} />
        <Route path={"/login"} element={<LogIn authSet={authSet}/>} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/dashboard"} element={<Dashboard auth={auth} user={user}/>} />
        <Route path={"/dashboard/profile"} element={<Profile auth={auth} user={user}/>} />
        <Route path={"/dashboard/:catid/edit"} element={<EditCat auth={auth} user={user}/>} />
        <Route path={"/dashboard/addcat"} element={<AddCat auth={auth} user={user}/>} />
        <Route path={"/dashboard/requests"} element={<AvailableRequests auth={auth} user={user}/>} />
        <Route path={"/dashboard/requests/:requestid"} element={<RequestShow auth={auth} user={user}/>} />
        <Route path={"/dashboard/requests/:requestid/edit"} element={<EditRequest auth={auth} user={user}/>} />
        <Route path={"/dashboard/requests/new"} element={<NewRequest auth={auth} user={user}/>} />
      </Routes>
    </div>  
  );
}

export default App;
