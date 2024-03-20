import React from 'react';
import ButtonHomePage from '../components/ui/ButtonHomePage.tsx';
import ComponentHomePage from '../components/ComponentHomePage.tsx';
import Header from '../components/Header/Header.tsx';
import Footer from '../components/Footer/Footer.tsx';
import '../scss/pages/HomePage.scss';
import '../scss/components/ui/ButtonHomePage.scss';
import '../scss/components/ComponentHomePage.scss';

interface Collection {
  name: string;
  details: string;
}

const HomePage: React.FC = () => {
  const collections: Collection[] = [
    { name: 'Collection 1', details: 'Creator: John Doe' },
    { name: 'Collection 2', details: 'Creator: Jane Smith' },
    { name: 'Collection 3', details: 'Creator: Bob Johnson' },
  ];

  const creators: { name: string; details: string }[] = [
    { name: 'John Doe', details: '1 000 Followers' },
    { name: 'Jane Smith', details: '1 000 Followers' },
    { name: 'Bob Johnson', details: '10 000 Followers' },
  ];

  const handleButtonClick = () => {
    // Add your click handling logic here
  };

  return (
    <div className="app-container">
      <Header />
      <div className="title">
        <h1>Welcome to Instamint</h1>
        <p>The platform for minting, buying, and selling NFTs.</p>
        <ButtonHomePage onClick={handleButtonClick} />
      </div>
      <ComponentHomePage
        title="Featured Collections"
        subtitle="Discover the latest collections from our featured creators."
        items={collections}
      />
      <ComponentHomePage
        title="Popular Creators"
        subtitle="Discover the best creators on Instamint."
        items={creators}
      />
      <Footer />
    </div>
  );
};

export default HomePage;
