import { Fragment } from 'react';
import '../../../scss/components/ui/authForms/authForms.scss';
import '../../../scss/components/ui/authForms/authFormsResponsive.scss';
import Input from '../../../components/ui/Input';
import { useTwoFactorForm } from '../../../hooks/useTwoFactorForm';

const fieldsForm = [
  {
    name: 'code',
    type: 'text',
    label: 'Verification Code',
    placeholder: 'Enter your verification code',
  },
];

export default function TwoFactorAuthForm() {
  const { formData, formMessages, handleChange, handleSubmit } =
    useTwoFactorForm();

  return (
    <div className="authForm">
      <div className="titleForm">
        <h2>Two-Factor Authentication</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {fieldsForm.map((field) => (
          <Fragment key={field.name}>
            <Input
              type={field.type}
              label={field.label}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
            />
            {formMessages[field.name as keyof typeof formMessages] && (
              <span style={{ color: 'red' }}>
                {formMessages[field.name as keyof typeof formMessages]}
              </span>
            )}
          </Fragment>
        ))}
        <div className="buttonsForm">
          <button className="nextButton">Verify</button>
          {formMessages.apiError && (
            <span style={{ color: 'red' }}>{formMessages.apiError}</span>
          )}
        </div>
      </form>
    </div>
  );
}
