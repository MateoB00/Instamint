import React from 'react';
import '../../scss/layout/Header.scss';

const Header: React.FC = () => (
  <header className="header">
    <div className="logo">
      <img src="./src/assets/image/logo-instamint.ico" />
      <span className="logo">
        <h1>Instamint</h1>
      </span>
    </div>
    <nav className="nav">
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Explore</a>
        </li>
        <li>
          <a href="#">My NFTs</a>
        </li>
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <a href="#">
            <img src="./src/assets/image/gear.png" alt="Gear Icon" />
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
