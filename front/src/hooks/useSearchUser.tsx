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

  const handleCancel = () => {
    setSearchOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setSearchOpen(false);
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
    handleCancel,
    searchRef,
    inputRef,
  };
};

export default useSearchUser;
