import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/auth/login';
import UserProfile from './pages/profile/UserProfile';
import UserRegister from "./pages/auth/UserRegister";
import {Logout} from "@mui/icons-material";
import ForgotPassword from "./pages/auth/ForgotPassword";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path='/register' element={<UserRegister/>}/>
        <Route path="/user-profile" element={<UserProfile/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/" element={<Navigate replace to="/login"/>}/>
      </Routes>
    </Router>
  );
};

export default App;