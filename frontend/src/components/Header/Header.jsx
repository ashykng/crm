import React from 'react';
import './header.css';
import 'boxicons/css/boxicons.min.css';

const Header = () => {
    const token = localStorage.getItem('authToken'); // Check for token in localStorage

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Clear token from localStorage
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <header className="header">
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="icons">
                <i className="bx bx-menu" id="menu-icon"></i>
                <i className="bx bx-x" id="close-icon"></i>
            </label>
            <nav className="navbar">
                {token && <a href="/" style={{ '--i': 0 }}>صفحه اصلی</a>}
                {/* Show login link only if there is no token */}
                {!token && <a href="/login" style={{ '--i': 1 }}>ورود</a>}
                {/* Show Exit button if token is present */}
                {token && <button onClick={handleLogout} style={{ '--i': 1 }}>خروج</button>}
            </nav>
        </header>
    );
};

export default Header;