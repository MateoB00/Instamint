import { useState } from 'react';
import { authChangeEmail } from '../api/authChangeMail';
import { shemaChangeEmail, catchErrors } from '../utils/yup';

export function useChangeEmailForm() {
  const [emailData, setEmailData] = useState({ email: '', newEmail: '' });
  const [formErrors, setFormErrors] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors('');
    try {
      await shemaChangeEmail.validate(emailData, { abortEarly: false });
      const response = await authChangeEmail(
        emailData.email,
        emailData.newEmail,
      );
      if (!response.success) {
        setFormErrors(response.message);
      } else {
        // eslint-disable-next-line no-alert
        alert(
          'Email successfully changed. Please check your new email to verify.',
        );
      }
    } catch (errors) {
      const formattedErrors = catchErrors(errors);
      setFormErrors(formattedErrors.newEmail || formattedErrors.email);
    }
  };

  return { emailData, formErrors, handleChange, handleSubmit };
}
