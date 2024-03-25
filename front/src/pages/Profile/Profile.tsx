import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { getUserData } from '../../api/auth';
import QRCode from 'qrcode.react';

const Profile: React.FC = () => {
  const [secret2FA, setSecret2FA] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    getUserData()
      .then((res) => {
        res.json().then((respo) => {
          setSecret2FA(respo.otpPath);
        });
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <div className="app-container">
      <Header />
      <div className="title">
        <h1>My Profile</h1>
        <h2>Your Secret for 2FA:</h2>
        {secret2FA && <QRCode value={`${secret2FA}`} />}
        {error}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
