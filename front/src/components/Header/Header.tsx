import { useEffect } from 'react';
import '../../scss/layout/Header.scss';
import instamintIcon from '../../assets/Image/logo-instamint.svg';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../../hooks/useUserProfile';
import { authLogout } from '../../api/auth';
import Button from '../ui/Button';
import HeaderLeftSection from './HeaderLeftSection';
import HeaderRightSection from './HeaderRightSection';
import BurgerMenu from './BurgerMenu';

export default function Header() {
  const navigate = useNavigate();
  const { userData, fetchUserData } = useUserProfile();

  const handleClickToNavigateOnProfilePage = (
    optionsProfiles: 'NFTs' | 'Informations',
  ) => {
    if (userData) {
      navigate('/me', {
        state: {
          setOptionsProfiles: optionsProfiles,
        },
      });
    } else {
      navigate('/auth');
    }
  };

  useEffect(() => {
    fetchUserData();
  });

  return (
    <header>
      <div className="header">
        {window.innerWidth <= 450 ? (
          <BurgerMenu />
        ) : (
          <HeaderLeftSection userData={userData} />
        )}
        <Button className="instamint">
          <img src={instamintIcon} alt="instamintIcon" />
        </Button>
        <HeaderRightSection
          userData={userData}
          handleClickToNavigateOnProfilePage={
            handleClickToNavigateOnProfilePage
          }
          authLogout={authLogout}
          navigate={navigate}
        />
      </div>
    </header>
  );
}
