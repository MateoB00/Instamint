import React, { useState } from 'react';
import { authChangePicture } from '../../../api/user';

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
    if (file && file.size <= 5000000) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target?.result as string;
        setProfilePicture(dataURL);
      };
      reader.readAsDataURL(file);
    } else {
      setFormErrors('Please upload a valid image file under 5MB.');
    }
  };

  const handleRestoreOriginal = () => {
    setProfilePicture(originalProfilePicture);
  };

  const handleSavePictureClick = async () => {
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
    handleSavePictureClick,
    formErrors,
  };
};
