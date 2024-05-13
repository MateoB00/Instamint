import React, { useState } from 'react';
import '../../../scss/components/ui/resetPasswordForm/resetPasswordForms.scss';
import '../../../scss/components/ui/resetPasswordForm/resetPasswordResponsive.scss';
import InputForm from '../InputForm';
import Button from '../Button';
import { passwordReset } from '../../../api/auth';

const fieldsForm = {
  name: 'password',
  type: 'password',
  label: 'Password',
  placeholder: 'Enter new password',
};

interface Props {
  token: string | null | undefined;
}

export default function PasswordResetForm({ token }: Props) {
  const [password, setPassword] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    passwordReset(token, password).then(() => {
      window.location.href = '/auth';
    });
  };

  return (
    <div className="resetForm">
      <div className="titleForm">
        <h2>Reset Password</h2>
      </div>
      <div className="form">
        <InputForm
          type={fieldsForm.type}
          label={fieldsForm.label}
          name={fieldsForm.name}
          placeholder={fieldsForm.placeholder}
          value={password}
          onChange={handleChange}
        />
        <div className="buttonsForm">
          <Button onClick={handleSubmit}>Update</Button>
        </div>
      </div>
    </div>
  );
}
