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
import DeleteAccountProfile from '../../components/userProfile/deleteAccountProfile';
import { UserInterface } from '../../interfaces/userData';

type FetchUserDataFunction = () => void;

function renderProfileOption(
  optionsProfiles: string,
  userData: UserInterface | null | undefined,
  fetchUserData: FetchUserDataFunction,
) {
  switch (optionsProfiles) {
    case 'NFTs':
      return <ItemsProfile />;
    case 'Informations':
      return <UpdateProfile userData={userData} />;
    case '2FA':
      return (
        <TwoFactorProfile userData={userData} fetchUserData={fetchUserData} />
      );
    case 'Delete Account':
      return <DeleteAccountProfile />;
    default:
      return null;
  }
}

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
    handleSwhowDeleteProfile,
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
              <Button onClick={handleSwhowDeleteProfile}>Delete Account</Button>
            </div>
            {renderProfileOption(optionsProfiles, userData, fetchUserData)}
          </div>
        </div>
      </section>
    </>
  );
}
