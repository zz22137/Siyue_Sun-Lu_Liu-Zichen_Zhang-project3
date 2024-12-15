import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserProfilePage from './components/UserProfilePage';

const App = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('token', userData.token);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <Router>
            <Navbar user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HomePage user={user} />} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/register" element={<RegisterPage onRegister={handleLogin} />} />
                <Route path="/profile/:userId" element={<UserProfilePage />} />
            </Routes>
        </Router>
    );
};

export default App;
