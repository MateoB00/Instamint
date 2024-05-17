import React from 'react';
import ButtonHomePage from '../components/ui/ButtonHomePage.tsx';
import ComponentHomePage from '../components/ComponentHomePage.tsx';
import Header from '../components/Header/Header.tsx';
import Footer from '../components/Footer/Footer.tsx';
import '../scss/pages/HomePage.scss';
import '../scss/components/ui/ButtonHomePage.scss';
import '../scss/components/ComponentHomePage.scss';
import { useTranslation } from 'react-i18next';

interface Collection {
  name: string;
  details: string;
}

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const collections: Collection[] = [
    { name: t('featured.name.1'), details: t('featured.details.1') },
    { name: t('featured.name.2'), details: t('featured.details.2') },
    { name: t('featured.name.3'), details: t('featured.details.3') },
  ];

  const creators: { name: string; details: string }[] = [
    { name: t('popular.name.1'), details: t('popular.details.1') },
    { name: t('popular.name.2'), details: t('popular.details.2') },
    { name: t('popular.name.3'), details: t('popular.details.3') },
  ];

  const handleButtonClick = () => {
    // Add your click handling logic here
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <div className="title">
          <h1>{t('WelcomeMessage')}</h1>
          <p>{t('p')}</p>
          <ButtonHomePage onClick={handleButtonClick} />
        </div>
        <ComponentHomePage
          title={t('featured.collections')}
          subtitle={t('featured.p')}
          items={collections}
        />
        <ComponentHomePage
          title={t('popular.creators')}
          subtitle={t('popular.p')}
          items={creators}
        />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
