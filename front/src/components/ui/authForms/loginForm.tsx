import { Fragment } from 'react';
import '../../../scss/components/ui/authForms/authForms.scss';
import '../../../scss/components/ui/authForms/authFormsResponsive.scss';
import logo from '../../../assets/Image/logo-instamint.svg';
import Input from '../../../components/ui/Input';
import { resendEmailConfirmation } from '../../../api/auth';
import { useLoginForm } from '../../../hooks/useLoginForm';

const fieldsForm = [
  {
    name: 'email',
    type: 'email',
    label: 'E-mail',
    placeholder: 'Enter your e-mail',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
];

export default function LoginForm() {
  const { formData, formMessages, handleChange, handleSubmit } = useLoginForm();

  return (
    <div className="authForm">
      <div className="titleForm">
        <h2>Log in</h2>
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
          <button className="nextButton">Connection</button>
          {formMessages.apiError && (
            <span style={{ color: 'red' }}>{formMessages.apiError}</span>
          )}
          {formMessages.apiError === 'Email not verified' && (
            <button onClick={() => resendEmailConfirmation(formData.email)}>
              Send another email
            </button>
          )}
          <button className="forgotPasswordButton">Forgot password?</button>
        </div>
      </form>
      <p>
        Don't have an account ? <span>Sign up</span>
      </p>
      <img src={logo} alt="logo" />
    </div>
  );
}
