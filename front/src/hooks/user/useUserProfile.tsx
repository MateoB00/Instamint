import { getMe } from '../../api/user';
import { useState } from 'react';
import { UserInterface } from '../../interfaces/userData';

interface LocationState {
  state: {
    setOptionsProfiles: 'NFTs' | 'Drafts' | 'Informations';
  };
}

export const useUserProfile = () => {
  const [optionsProfiles, setOptionsProfiles] = useState<
    'NFTs' | 'Drafts' | 'Informations'
  >('NFTs');

  const [userData, setUserData] = useState<UserInterface | null>();

  const fetchUserData = async () => {
    const responseGetMe = await getMe();
    if (responseGetMe === 401) {
      setUserData(null);
    } else {
      setUserData(responseGetMe);
    }
  };

  const handleShowMainProfile = () => {
    setOptionsProfiles('NFTs');
  };

  const handleShowUpdateProfile = () => {
    setOptionsProfiles('Informations');
  };

  const navigateProfilePage = (location: LocationState) => {
    const initialState = location.state || {};
    if (initialState.setOptionsProfiles) {
      setOptionsProfiles(initialState.setOptionsProfiles);
    }
  };

  return {
    optionsProfiles,
    userData,
    fetchUserData,
    handleShowMainProfile,
    handleShowUpdateProfile,
    navigateProfilePage,
  };
};
