import React from 'react';
import './header.css';
import 'boxicons/css/boxicons.min.css';

const Header = () => {

    return (
        <header className="header">
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="icons">
                <i className="bx bx-menu" id="menu-icon"></i>
                <i className="bx bx-x" id="close-icon"></i>
            </label>
            <nav className="navbar">
                <a href="/" style={{ '--i': 0 }}>Home</a>
                <a href="/login" style={{ '--i': 1 }}>Login</a>
            </nav>
        </header>
    );
};

export default Header;
