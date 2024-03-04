import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <nav className="nav">
                <ul className="nav-list">
                    <li><a href="#" className="nav-link">Home</a></li>
                    <li><a href="#" className="nav-link">Explore</a></li>
                    <li><a href="#" className="nav-link">My NFTs</a></li>
                    <li><a href="#" className="nav-link">Profile</a></li>
                </ul>
            </nav>
            <button className="get-started-button">Get Started</button>
        </footer>
    );
}

export default Footer;