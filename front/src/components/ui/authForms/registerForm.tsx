import { Fragment } from 'react';
import '../../../scss/components/ui/authForms/authForms.scss';
import '../../../scss/components/ui/authForms/authFormsResponsive.scss';
import logo from '../../../assets/Image/logo-instamint.svg';
import Input from '../../../components/ui/Input';
import { useRegisterForm } from '../../../hooks/useRegisterForm';

const fieldsForm = [
  {
    name: 'email',
    type: 'email',
    label: 'E-mail',
    placeholder: 'Enter your e-mail',
  },
  {
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'Enter your username',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Enter your confirm password',
  },
];

export default function RegisterForm() {
  const { formData, formMessages, handleChange, handleSubmit } =
    useRegisterForm();

  return (
    <div className="authForm">
      <div className="titleForm">
        <h2>Register</h2>
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
        {formMessages.apiError && (
          <span style={{ color: 'red' }}>{formMessages.apiError}</span>
        )}
        {formMessages.apiSuccess && (
          <span style={{ color: '#16502d' }}>{formMessages.apiSuccess}</span>
        )}
        <div className="buttonsForm">
          <button className="nextButton">Next</button>
        </div>
      </form>
      <p>
        Do you already have an account ? <span>Log in</span>
      </p>
      <img src={logo} alt="logo" />
    </div>
  );
}
