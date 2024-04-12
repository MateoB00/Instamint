import React, { useState } from 'react';
import Button from '../ui/Button';
import menuIcon from '../../assets/Icon/header/Menu.svg';
import PopupMenu from './PopupMenu';
import '../../scss/layout/Header/BurgerMenu.scss';
const BurgerMenu: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <div className="burger-menu">
      <button onClick={togglePopup}>
        <img className="icon" src={menuIcon} alt="menuIcon" />
      </button>
      {showPopup && <PopupMenu />} {/* Affichez la popup lorsque showPopup est true */}
    </div>
  );
};

export default BurgerMenu;
