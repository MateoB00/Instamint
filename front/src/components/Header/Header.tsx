import { useEffect } from 'react';
import '../../scss/layout/Header.scss';
import instamintIcon from '../../assets/Image/logo-instamint.svg';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../../hooks/useUserProfile';
import { authLogout } from '../../api/auth';
import Button from '../ui/Button';
import HeaderLeftSection from './HeaderLeftSection';
import HeaderRightSection from './HeaderRightSection';

export default function Header() {
  const navigate = useNavigate();
  const { userData, fetchUserData } = useUserProfile();

  const handleClick = (optionsProfiles: 'NFTs' | 'Informations') => {
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
        <HeaderLeftSection />
        <Button className="instamint">
          <img src={instamintIcon} alt="instamintIcon" />
        </Button>
        <HeaderRightSection
          userData={userData}
          handleClick={handleClick}
          authLogout={authLogout}
          navigate={navigate}
        />
      </div>
    </header>
  );
}
