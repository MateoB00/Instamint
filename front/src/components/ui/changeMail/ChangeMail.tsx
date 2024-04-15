import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import { shemaChangeEmail, catchErrors } from '../../../utils/yup';

interface FormattedErrors {
  newEmail: string;
  currentEmail: string;
}

export default function AuthChangeEmail() {
  const [emailData, setEmailData] = useState({
    currentEmail: '',
    newEmail: '',
  });
  const [formErrors, setFormErrors] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const validateEmailData = async () => {
    try {
      await shemaChangeEmail.validate(emailData, { abortEarly: false });
    } catch (errors) {
      const formattedErrors: FormattedErrors = catchErrors(
        errors,
      ) as FormattedErrors;
      setFormErrors(formattedErrors.newEmail || formattedErrors.currentEmail);

      return false;
    }

    return true;
  };

  const changeEmail = () => {
    setSuccessMessage(
      'Email successfully changed. Please check your inbox to verify the new email.',
    );
  };

  const handleSubmit = async () => {
    setFormErrors('');
    setSuccessMessage('');
    const isValid = await validateEmailData();
    if (!isValid) {
      return;
    }
    await changeEmail();
  };

  return (
    <div className="authForm">
      <form>
        <h2>Change Email</h2>
        <Input
          type="email"
          name="currentEmail"
          value={emailData.currentEmail}
          onChange={handleChange}
          placeholder="Current Email"
        />
        <Input
          type="email"
          name="newEmail"
          value={emailData.newEmail}
          onChange={handleChange}
          placeholder="New Email"
        />
        {formErrors && <span style={{ color: 'red' }}>{formErrors}</span>}
        {successMessage && (
          <span style={{ color: 'green' }}>{successMessage}</span>
        )}
        <button type="submit" onClick={handleSubmit}>
          Change Email
        </button>
      </form>
    </div>
  );
}
