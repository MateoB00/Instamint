import React, { useState } from 'react';
import { authChangeBio } from '../../../api/user';

export const useEditBio = () => {
  const [bio, setBio] = useState('');
  const [formErrors, setFormErrors] = useState('');

  const handleSaveClick = async () => {
    try {
      await authChangeBio(bio);
      setBio(bio);
      setFormErrors('');
    } catch (error) {
      setFormErrors('An error occurred while updating the biography.');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  return {
    bio,
    handleSaveClick,
    handleChange,
    formErrors,
  };
};
