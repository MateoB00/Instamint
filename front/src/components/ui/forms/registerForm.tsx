import { Fragment } from 'react';
import '../../../scss/components/ui/authForms/authForms.scss';
import '../../../scss/components/ui/authForms/authFormsResponsive.scss';
import logo from '../../../assets/Image/logo-instamint.svg';
import InputForm from '../InputForm';
import { useRegisterForm } from '../../../hooks/auth/useRegisterForm';
import Button from '../Button';

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
  const {
    formData,
    formYupMessages,
    formApiMessages,
    handleChange,
    handleSubmit,
  } = useRegisterForm();

  return (
    <div className="authForm">
      <div className="titleForm">
        <h2>Register</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {fieldsForm.map((field) => (
          <Fragment key={field.name}>
            <InputForm
              type={field.type}
              label={field.label}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
            />
            {formYupMessages[field.name as keyof typeof formYupMessages] && (
              <span style={{ color: 'red' }}>
                {formYupMessages[field.name as keyof typeof formYupMessages]}
              </span>
            )}
          </Fragment>
        ))}
        {formApiMessages.apiError && (
          <span style={{ color: 'red' }}>{formApiMessages.apiError}</span>
        )}
        {formApiMessages.apiSuccess && (
          <span style={{ color: '#16502d' }}>{formApiMessages.apiSuccess}</span>
        )}
        <div className="buttonsForm">
          <Button className="nextButton">Next</Button>
        </div>
      </form>
      <p>
        Do you already have an account ? <span>Log in</span>
      </p>
      <img src={logo} alt="logo" />
    </div>
  );
}