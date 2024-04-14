import { useState } from 'react';
import Input from '../../../components/ui/Input';
import { authChangeEmail } from '../../../api/authChangeMail';
import { shemaChangeEmail, catchErrors } from '../../../utils/yup';

export default function AuthChangeEmail() {
  const [emailData, setEmailData] = useState({ currentEmail: '', newEmail: '' });
  const [formErrors, setFormErrors] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const validateEmailData = async () => {
    try {
      await shemaChangeEmail.validate(emailData, { abortEarly: false });
    } catch (errors) {
      const formattedErrors = catchErrors(errors);
      setFormErrors(formattedErrors.newEmail || formattedErrors.currentEmail);
      return false;
    }
    return true;
  };

  const changeEmail = async () => {
    try {
      const response = await authChangeEmail(emailData.currentEmail, emailData.newEmail, '');
      setSuccessMessage('Email successfully changed. Please check your inbox to verify the new email.');
    } catch (error) {
      setFormErrors(error.message || 'An error occurred while attempting to change email.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors('');
    setSuccessMessage('');
    const isValid = await validateEmailData();
    if (!isValid) return;
    await changeEmail();
  };

  return (
    <div className="authForm">
      <form onSubmit={handleSubmit}>
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
        {successMessage && <span style={{ color: 'green' }}>{successMessage}</span>}
        <button type="submit">Change Email</button>
      </form>
    </div>
  );
}
