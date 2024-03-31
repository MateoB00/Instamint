import { useState } from 'react';
import Input from '../../../components/ui/Input';
import { authChangeEmail } from '../../../api/authChangeMail'; 
import { shemaChangeEmail, catchErrors } from '../../../utils/yup'; 

export default function AuthChangeEmail() {
  const [emailData, setEmailData] = useState({
    currentEmail: '', 
    newEmail: '',
  });
  const [formErrors, setFormErrors] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors('');

    shemaChangeEmail
      .validate(emailData, { abortEarly: false })
      .then(async () => {
        const response = await authChangeEmail(emailData.currentEmail, emailData.newEmail);  

        if (response.success) {
          alert('Email successfully changed. Please check your inbox to verify the new email.');
        } else {
          setFormErrors(response.message);
        }
      })
      .catch((errors) => {
        const formattedErrors = catchErrors(errors);
        setFormErrors(formattedErrors.newEmail || formattedErrors.currentEmail);
      });
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
        <button type="submit">Change Email</button>
      </form>
    </div>
  );
}
