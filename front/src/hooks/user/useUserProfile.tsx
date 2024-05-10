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
    'NFTs' | 'Drafts' | 'Informations' | '2FA' | 'Delete Account'
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

  const handleShowNftsProfile = () => {
    setOptionsProfiles('NFTs');
  };

  const handleShowDraftsProfile = () => {
    setOptionsProfiles('Drafts');
  };

  const handleShowUpdateProfile = () => {
    setOptionsProfiles('Informations');
  };

  const handleShow2FAProfile = () => {
    setOptionsProfiles('2FA');
  };

  const handleSwhowDeleteProfile = () => {
    setOptionsProfiles('Delete Account');
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
    handleShowNftsProfile,
    handleShowDraftsProfile,
    handleShowUpdateProfile,
    navigateProfilePage,
    handleShow2FAProfile,
    handleSwhowDeleteProfile,
  };
};
