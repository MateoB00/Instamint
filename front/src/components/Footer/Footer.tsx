import React from 'react';
import '../../scss/layout/Footer.scss';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <a href="#" className="nav-link">
              {t('menu.home')}
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              {t('menu.explore')}
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              {t('menu.my.nfts')}
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              {t('menu.profile')}
            </a>
          </li>
        </ul>
      </nav>
      <button className="get-started-button">{t('menu.get.started')}</button>
    </footer>
  );
};

export default Footer;
