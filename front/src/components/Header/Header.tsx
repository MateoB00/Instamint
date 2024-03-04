import React from 'react';
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="./src/assets/image/logo-instamint.ico"/>
                <span className="logo"><h1>Instamint</h1></span>
            </div>
            <nav className="nav">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Explore</a></li>
                    <li><a href="#">My NFTs</a></li>
                    <li><a href="#">Profile</a></li>
                </ul>
            </nav>
        </header>
    );
    
}

export default Header;
