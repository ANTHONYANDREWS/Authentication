import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from 'react';
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import UserInfo from "./components/UserInfo/UserInfo";
import User from "./components/User/User";
import Pagenotfound from "./components/404page/Pagenotfound";

function App() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Signup />} />
        <Route path="/signup" exact element={<Signup  setIsSignUp={setIsSignUp}/>} />
        <Route path="/login" exact element={<Login  isSignUp={isSignUp}/>} />
        <Route path="/user" element={<User isSignUp={isSignUp} />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
