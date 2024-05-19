import React, { useState, useRef } from 'react';

export const useSearchUser = () => {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/search?username=${searchQuery}&location=${locationQuery}`,
    );
    const data = await response.json();
    setUsernames(data.map((user: { username: string }) => user.username));
  };

  const handleCancel = () => {
    setSearchOpen(false);
  };

  return {
    isSearchOpen,
    toggleSearch,
    searchQuery,
    handleSearchChange,
    handleSearchSubmit,
    handleCancel,
    searchRef,
    inputRef,
    usernames,
    setUsernames,
    setLocationQuery,
    setSearchQuery,
    locationQuery,
  };
};

export default useSearchUser;
