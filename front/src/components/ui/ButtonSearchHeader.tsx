import React from 'react';
import { useSearchUser } from '../../hooks/useSearchUser';
import Button from '../ui/Button';
import searchIcon from '../../assets/Icon/header/Search_light.svg';

const ButtonSearchHeader: React.FC = () => {
  const {
    isSearchOpen,
    toggleSearch,
    searchQuery,
    handleSearchChange,
    searchRef,
    inputRef,
    handleKeyPress,
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
        <div className="search-bar" ref={searchRef}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            placeholder="Rechercher..."
            ref={inputRef}
          />
        </div>
      )}
    </div>
  );
};

export default ButtonSearchHeader;
