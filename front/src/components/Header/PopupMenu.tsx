import React from 'react';
import Button from '../ui/Button';
import groupIcon from '../../assets/Icon/header/Group_light.svg';
import chatIcon from '../../assets/Icon/header/Chat_alt_3_light.svg';
import notificationIcon from '../../assets/Icon/header/Bell_light.svg';
import ButtonSearchHeader from '../ui/ButtonSearchHeader';
import '../../scss/layout/Header/PopupMenu.scss'; // Importez les styles spécifiques à la PopupMenu

const PopupMenu: React.FC = () => {
  return (
    <div className="popup-menu">
      <Button>
        <img className="icon" src={groupIcon} alt="groupIcon" />
      </Button>
      <Button>
        <img className="icon" src={chatIcon} alt="chatIcon" />
      </Button>
      <Button>
        <img className="icon" src={notificationIcon} alt="notificationIcon" />
      </Button>
      <ButtonSearchHeader />
    </div>
  );
};

export default PopupMenu;