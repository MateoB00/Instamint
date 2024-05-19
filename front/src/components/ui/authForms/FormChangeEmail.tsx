// src/components/ui/forms/changeMail/ChangeEmailForm.tsx
import React, { useState } from 'react';
import InputForm from '../InputForm';
import Button from '../Button';
import { changeEmail } from '../../../api/auth';

const ChangeEmailForm = () => {
  const [emailData, setEmailData] = useState({ email: '', newEmail: '' });
  const [formErrors, setFormErrors] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors('');
    setSuccessMessage('');

    try {
      await changeEmail(emailData);
      setSuccessMessage('Email successfully changed. Please check your new email to verify.');
    } catch (error) {
      setFormErrors('Failed to change email. Please try again.');
    }
  };

  return (
    <div className="authForm">
      <form onSubmit={handleSubmit}>
        <h2>Change Email</h2>
        <InputForm
          type="email"
          name="email"
          value={emailData.email}
          onChange={handleChange}
          placeholder="Current Email"
        />
        <InputForm
          type="email"
          name="newEmail"
          value={emailData.newEmail}
          onChange={handleChange}
          placeholder="New Email"
        />
        {formErrors && <span style={{ color: 'red' }}>{formErrors}</span>}
        {successMessage && <span style={{ color: 'green' }}>{successMessage}</span>}
        <Button type="submit">Change Email</Button>
      </form>
    </div>
  );
};

export default ChangeEmailForm;