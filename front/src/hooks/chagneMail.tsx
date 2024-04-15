import React, { useState } from 'react';
import { authChangeEmail } from '../api/authChangeMail';
import { shemaChangeEmail, catchErrors } from '../utils/yup';

interface Formattedresponse {
  success: string;
  message: string;
}

interface FormattedErrors {
  newEmail: string;
  email: string;
}

export function useChangeEmailForm() {
  const [emailData, setEmailData] = useState({ email: '', newEmail: '' });
  const [formErrors, setFormErrors] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleSubmit = async () => {
    setFormErrors('');
    try {
      await shemaChangeEmail.validate(emailData, { abortEarly: false });
      const response: Formattedresponse = (await authChangeEmail(
        emailData.email,
        emailData.newEmail,
      )) as Formattedresponse;
      if (!response.success) {
        setFormErrors(response.message);
      } else {
        // eslint-disable-next-line no-alert
        alert(
          'Email successfully changed. Please check your new email to verify.',
        );
      }
    } catch (errors) {
      const formattedErrors: FormattedErrors = catchErrors(
        errors,
      ) as FormattedErrors;
      setFormErrors(formattedErrors.newEmail || formattedErrors.email);
    }
  };

  return { emailData, formErrors, handleChange, handleSubmit };
}
