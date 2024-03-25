import React from 'react';
import Button from '../ui/Button';
import profileIcon from '../../assets/Icon/header/User_light.svg';
import settingsIcon from '../../assets/Icon/header/Setting_line_light.svg';
import signOutIcon from '../../assets/Icon/header/Sign_out_squre_light.svg';
import { UserInterface } from '../../interfaces/userData';
import { NavigateFunction } from 'react-router-dom';

interface HeaderRightSectionProps {
  userData: UserInterface | null | undefined;
  handleClick: (optionsProfiles: 'NFTs' | 'Informations') => void;
  authLogout: () => void;
  navigate: NavigateFunction;
}

const HeaderRightSection: React.FC<HeaderRightSectionProps> = ({
  userData,
  handleClick,
  authLogout,
  navigate,
}) => (
  <div className="right">
    <Button onClick={() => handleClick('NFTs')}>
      <img className="icon" src={profileIcon} alt="profileIcon" />
    </Button>
    <Button onClick={() => handleClick('Informations')}>
      <img className="icon" src={settingsIcon} alt="settingsIcon" />
    </Button>
    {userData && (
      <Button
        onClick={() => {
          authLogout();
          navigate('/');
        }}
      >
        <img className="icon" src={signOutIcon} alt="signOutIcon" />
      </Button>
    )}
  </div>
);

export default HeaderRightSection;
