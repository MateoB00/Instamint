import React, { useState } from 'react';
import PopupSetting from '../ui/popup/PopupSetting.tsx';
import '../../scss/layout/Header.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isPopupSettingOpen, setPopupSettingOpen] = useState(false);

  const OpenGearIcon = () => {
    setPopupSettingOpen(true);
  };

  const closePopupSetting = () => {
    setPopupSettingOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="./src/assets/Image/logo-instamint.ico" />
        <span className="logo">
          <h1>{t('appName')}</h1>
        </span>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <a href="#">{t('menu.home')}</a>
          </li>
          <li>
            <a href="#">{t('menu.explore')}</a>
          </li>
          <li>
            <a href="#">{t('menu.my.nfts')}</a>
          </li>
          <li>
            <Link to="/profile">{t('menu.profile')}</Link>
          </li>
          <li>
            <a href="#" onClick={OpenGearIcon}>
              <img src="./src/assets/Image/gear.png" alt="Gear Icon" />
            </a>
            {isPopupSettingOpen && <PopupSetting onClose={closePopupSetting} />}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
