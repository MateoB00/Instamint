import React, { useState } from 'react';
import PopupSetting from '../ui/popup/PopupSetting.tsx';
import '../../scss/layout/Header.scss';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isPopupSettingOpen, setPopupSettingOpen] = useState(false);

  const OpenGearIcon = () => {
    setPopupSettingOpen(true);
    // eslint-disable-next-line no-console
    console.log('Gear icon clicked!');
  };

  const closePopupSetting = () => {
    setPopupSettingOpen(false);
    // eslint-disable-next-line no-console
    console.log('Popup setting closed!');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="./src/assets/image/logo-instamint.ico" />
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
            <a href="#">{t('menu.profile')}</a>
          </li>
          <li>
            <a href="#" onClick={OpenGearIcon}>
              <img src="./src/assets/image/gear.png" alt="Gear Icon" />
            </a>
            {isPopupSettingOpen && <PopupSetting onClose={closePopupSetting} />}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
