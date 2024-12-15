import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
    return (
        <nav>
            <div className="navbar-container">
                <Link to="/">Home</Link>
                {user ? (
                    <>
                        <Link to={`/profile/${user.id}`}>My Profile</Link>
                        <button onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
