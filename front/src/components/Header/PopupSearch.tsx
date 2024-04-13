import React, { useState, useEffect } from 'react';
import { useSearchUser } from '../../hooks/useSearchUser';
import Button from '../ui/Button';
import searchIcon from '../../assets/Icon/header/Search_light.svg';
import crossIcon from '../../assets/Icon/header/Dell_light.svg';

const PopupSearch: React.FC = () => {
    const [usernames, setUsernames] = useState<string[]>([]);
    const {
        searchQuery,
        handleSearchChange,
        searchRef,
        inputRef,
        handleSearchSubmit,
        handleCancel,
        isSearchOpen,
    } = useSearchUser({
        onSearch: (query: string) => {
            console.log('Recherche effectuée avec la valeur :', query);
        },
    });

    useEffect(() => {
        const fetchUsernames = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/allUsernames`);
            const data = await response.json();
            setUsernames(data);
        };

        fetchUsernames();
    }, []);

    return (
        <div className="search-bar" ref={searchRef}>
            <div className='search-container'>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Rechercher..."
                    ref={inputRef}
                />
                <Button onClick={handleSearchSubmit}>
                    <img className="searchIcon" src={searchIcon} alt="searchIcon" />
                </Button>
                <Button onClick={() => {
                    console.log("clicked cross icon button");
                    handleCancel();
                }}>
                    <img className="crossIcon" src={crossIcon} alt="crossIcon" />
                    
                </Button>
                <div className="usernames-list">
                    {usernames.map(username => (
                        <div className="username" key={username}>{username}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopupSearch;
