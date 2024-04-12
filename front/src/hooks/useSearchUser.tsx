import React, { useState, useRef, useEffect } from 'react';

interface UseSearchUserProps {
  onSearch: (_query: string) => void;
}

export const useSearchUser = ({ onSearch }: UseSearchUserProps) => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchQuery);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setSearchOpen(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return {
    isSearchOpen,
    toggleSearch,
    searchQuery,
    handleSearchChange,
    handleSearchSubmit,
    searchRef,
    inputRef,
    handleKeyPress,
  };
};

export default useSearchUser;
