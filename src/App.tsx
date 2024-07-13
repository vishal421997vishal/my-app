import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from './pages/auth/login';
import UserProfile from './pages/profile/UserProfile';
import UserRegister from "./pages/auth/UserRegister";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { SnackbarProvider } from './components/SnackbarContext';

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path='/register' element={<UserRegister/>}/>
          <Route path="/user-profile" element={<UserProfile/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/" element={<Navigate replace to="/login"/>}/>
        </Routes>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
