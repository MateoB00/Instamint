import { getMe } from '../../api/user';
import { useState } from 'react';
import { UserInterface } from '../../interfaces/userData';

interface LocationState {
  state: {
    setOptionsProfiles: 'NFTs' | 'Drafts' | 'Informations' | 'Notifications';
  };
}
/* eslint-disable no-undef, max-lines-per-function */
export const useUserProfile = () => {
  const [optionsProfiles, setOptionsProfiles] = useState<
    | 'NFTs'
    | 'Drafts'
    | 'Informations'
    | '2FA'
    | 'Delete Account'
    | 'Notifications'
  >('NFTs');

  const [userData, setUserData] = useState<UserInterface | null>();
  /* eslint-disable no-undef, max-lines-per-function */
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

  const handleShowNotifProfile = () => {
    setOptionsProfiles('Notifications');
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
    handleShowNotifProfile,
  };
};
