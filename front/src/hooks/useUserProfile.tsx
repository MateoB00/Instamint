import { getMe } from '../api/user';
import { useState } from 'react';
import { UserInterface } from '../interfaces/userData';
import { authChangePicture } from '../api/user';

interface LocationState {
  state: {
    setOptionsProfiles: 'NFTs' | 'Drafts' | 'Informations';
  };
}

export const useUserProfile = () => {
  const [optionsProfiles, setOptionsProfiles] = useState<
    'NFTs' | 'Drafts' | 'Informations'
  >('NFTs');

  const initialProfilePicture = '../src/assets/Image/user.jpg';
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture);
  const [originalProfilePicture, setOriginalProfilePicture] = useState(
    initialProfilePicture,
  );
  const [formErrors, setFormErrors] = useState('');
  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target?.result as string;
        setProfilePicture(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRestoreOriginal = () => {
    setProfilePicture(originalProfilePicture);
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    try {
      const response = await authChangePicture(profilePicture);

      if (response.success) {
        setOriginalProfilePicture(profilePicture);
      } else {
        setFormErrors(response.message);
      }
    } catch (error) {
      setFormErrors('An error occurred while uploading the profile picture.');
    }
  };


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
    handleProfilePictureChange,
    handleRestoreOriginal, 
    handleSaveClick,
    formErrors,
  };
};
