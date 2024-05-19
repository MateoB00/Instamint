/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useSearchUser } from '../../hooks/useSearchUser';
import Button from '../ui/Button';
import searchIcon from '../../assets/Icon/header/Search_light.svg';
import crossIcon from '../../assets/Icon/header/Dell_light.svg';

const PopupSearch: React.FC = () => {
  const {
    searchQuery,
    searchRef,
    inputRef,
    handleSearchSubmit,
    usernames,
    setUsernames,
    setLocationQuery,
    setSearchQuery,
    locationQuery,
    isSearchOpen,
    handleCancel,
  } = useSearchUser();

  useEffect(() => {
    const fetchUsernames = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/allUsernames`,
      );
      const data = await response.json();
      setUsernames(data);
    };

    fetchUsernames();
  }, [setUsernames]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen, inputRef]);

  return (
    <div className="search-bar" ref={searchRef}>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by username..."
          ref={inputRef}
        />
        <input
          type="text"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
          placeholder="Search by location..."
        />
        <Button onClick={handleSearchSubmit}>
          <img className="searchIcon" src={searchIcon} alt="searchIcon" />
        </Button>
        <Button onClick={handleCancel}>
          <img className="crossIcon" src={crossIcon} alt="crossIcon" />
        </Button>
        {searchQuery && (
          <div className="usernames-list">
            {usernames.map((username) => (
              <div className="username" key={username}>
                {username}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupSearch;
