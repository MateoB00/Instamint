import Button from '../ui/Button';
import profileIcon from '../../assets/Icon/header/User_light.svg';
import settingsIcon from '../../assets/Icon/header/Setting_line_light.svg';
import signOutIcon from '../../assets/Icon/header/Sign_out_squre_light.svg';
import { UserInterface } from '../../interfaces/userData';
import { NavigateFunction } from 'react-router-dom';

interface HeaderRightSectionProps {
  userData: UserInterface | null | undefined;
  handleClickToNavigateOnProfilePage: (
    _optionsProfiles: 'NFTs' | 'Informations',
  ) => void;
  authLogout: () => void;
  navigate: NavigateFunction;
}

export default function HeaderRightSection({
  userData,
  authLogout,
  handleClickToNavigateOnProfilePage,
  navigate,
}: HeaderRightSectionProps) {
  const logout = () => {
    authLogout();
    navigate('/');
  };

  return (
    <div className="right">
      <Button onClick={() => handleClickToNavigateOnProfilePage('NFTs')}>
        <img className="icon" src={profileIcon} alt="profileIcon" />
      </Button>
      <Button
        onClick={() => handleClickToNavigateOnProfilePage('Informations')}
      >
        <img className="icon" src={settingsIcon} alt="settingsIcon" />
      </Button>
      {userData && (
        <Button onClick={logout}>
          <img className="icon" src={signOutIcon} alt="signOutIcon" />
        </Button>
      )}
    </div>
  );
}
