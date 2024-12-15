import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/auth/register', { username, password });
            onRegister(res.data);
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div className="container">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
