import React, { useState } from 'react';
import { authChangePicture, authChangeBio } from '../api/auth';

export const usePageProfile = () => {
  const initialProfilePicture = '../src/assets/Image/user.jpg';
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture);
  const [originalProfilePicture, setOriginalProfilePicture] = useState(
    initialProfilePicture,
  );
  const [formErrors, setFormErrors] = useState('');
  const [bio, setBio] = useState('');
  const [editedBio, setEditedBio] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false);
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

  const handleEditBio = () => {
    setEditedBio(bio);
    setIsEditingBio(true);
  };

  const handleCancelEditBio = () => {
    setIsEditingBio(false);
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedBio(event.target.value);
  };

  const handleSaveEditedBio = async () => {
    try {
      const response = await authChangeBio(editedBio);

      if (response.success) {
        setBio(editedBio);
        setIsEditingBio(false);
      } else {
        setFormErrors(response.message);
      }
    } catch (error) {
      setFormErrors('An error occurred while updating the bio.');
    }
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    try {
      const response = await authChangePicture(profilePicture);

      if (response.success) {
        setOriginalProfilePicture(profilePicture);
        console.log('Edited Bio:', editedBio);
        setBio(editedBio);
      } else {
        setFormErrors(response.message);
      }
    } catch (error) {
      setFormErrors('An error occurred while uploading the profile picture.');
    }
  };



  return {
    handleProfilePictureChange,
    formErrors,
    setFormErrors,
    handleRestoreOriginal,
    handleSaveClick,
    setBio,
    bio,
    editedBio,
    isEditingBio,
    handleEditBio,
    handleCancelEditBio,
    handleBioChange,
    handleSaveEditedBio,
  };
};
