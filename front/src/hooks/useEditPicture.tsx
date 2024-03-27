import React, { useState } from 'react';
import { authChangePicture } from '../api/user';

export const useEditPicture = () => {
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
    return {
        handleProfilePictureChange,
        handleRestoreOriginal,
        handleSaveClick,
        formErrors,
    }
}