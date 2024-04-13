import React from 'react';
import { useSearchUser } from '../../hooks/useSearchUser';
import Button from '../ui/Button';
import searchIcon from '../../assets/Icon/header/Search_light.svg';
import PopupSearch from '../Header/PopupSearch';

const ButtonSearchHeader: React.FC = () => {
  const {
    isSearchOpen,
    toggleSearch,
  } = useSearchUser({
    onSearch: () => {
      //Add search query here
    },
  });

  return (
    <div className="search">
      <Button onClick={toggleSearch}>
        <img className="icon" src={searchIcon} alt="searchIcon" />
      </Button>
      {isSearchOpen && (
      <PopupSearch/>
      )}
    </div>
  );
};

export default ButtonSearchHeader;
