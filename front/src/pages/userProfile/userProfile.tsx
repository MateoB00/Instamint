import '../../scss/pages/userProfile/userProfile.scss';
import Header from '../../components/Header/Header';
import { useEffect } from 'react';
import ItemsProfile from '../../components/userProfile/itemsProfile';
import UpdateProfile from '../../components/userProfile/updateProfile';
import TwoFactorProfile from '../../components/userProfile/twoFactorProfile';
import CardProfile from '../../components/userProfile/cardProfile';
import { useUserProfile } from '../../hooks/user/useUserProfile';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function UserProfile() {
  const location = useLocation();
  const navigateReact = useNavigate();

  const {
    optionsProfiles,
    userData,
    fetchUserData,
    handleShowMainProfile,
    handleShowUpdateProfile,
    navigateProfilePage,
    handleShow2FAProfile,
  } = useUserProfile();

  useEffect(() => {
    fetchUserData();
    navigateProfilePage(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (userData === null) {
    navigateReact('/auth');
  }

  return (
    <>
      <Header />
      <section className="userProfilePage">
        <div className="blocks">
          {userData && <CardProfile userData={userData} />}
          <div className="itemsChoice">
            <div className="navigation">
              <Button onClick={handleShowMainProfile}>NFTs</Button>
              <Button>Drafts</Button>
              <Button onClick={handleShowUpdateProfile}>Informations</Button>
              <Button onClick={handleShow2FAProfile}>
                Double authentification
              </Button>
            </div>
            {optionsProfiles === 'NFTs' && <ItemsProfile />}
            {optionsProfiles === 'Informations' && (
              <UpdateProfile userData={userData} />
            )}
            {optionsProfiles === '2FA' && (
              <TwoFactorProfile
                userData={userData}
                fetchUserData={fetchUserData}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
