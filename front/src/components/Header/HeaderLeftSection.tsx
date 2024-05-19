import React from 'react';
import Button from '../ui/Button';
import groupIcon from '../../assets/Icon/header/Group_light.svg';
import chatIcon from '../../assets/Icon/header/Chat_alt_3_light.svg';
import notificationIcon from '../../assets/Icon/header/Bell_light.svg';
import { UserInterface } from '../../interfaces/userData';
import ButtonSearchHeader from '../ui/ButtonSearchHeader';

interface HeaderLeftSectionProps {
  userData: UserInterface | null | undefined;
}
const HeaderLeftSection: React.FC<HeaderLeftSectionProps> = ({ userData }) => (
  <div className="left">
    {userData && (
      <>
        <Button>
          <a href="/teabag">
            <img className="icon" src={groupIcon} alt="groupIcon" />
          </a>
        </Button>
        <Button>
          <img className="icon" src={chatIcon} alt="chatIcon" />
        </Button>
        <Button>
          <img className="icon" src={notificationIcon} alt="notificationIcon" />
        </Button>
        <ButtonSearchHeader />
      </>
    )}
  </div>
);

export default HeaderLeftSection;
