import React from 'react';
import Button from '../ui/Button';
import groupIcon from '../../assets/Icon/header/Group_light.svg';
import chatIcon from '../../assets/Icon/header/Chat_alt_3_light.svg';
import notificationIcon from '../../assets/Icon/header/Bell_light.svg';

const HeaderLeftSection: React.FC = () => (
  <div className="left">
    <Button>
      <img className="icon" src={groupIcon} alt="groupIcon" />
    </Button>
    <Button>
      <img className="icon" src={chatIcon} alt="chatIcon" />
    </Button>
    <Button>
      <img className="icon" src={notificationIcon} alt="notificationIcon" />
    </Button>
  </div>
);

export default HeaderLeftSection;
