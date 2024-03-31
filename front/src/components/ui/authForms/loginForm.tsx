import { Fragment } from 'react';
import '../../../scss/components/ui/authForms/authForms.scss';
import '../../../scss/components/ui/authForms/authFormsResponsive.scss';
import logo from '../../../assets/Image/logo-instamint.svg';
import InputForm from '../InputForm';
import { useLoginForm } from '../../../hooks/auth/useLoginForm';
import { resendEmailConfirmation } from '../../../api/auth';
import Button from '../Button';
import { renderMessages } from '../../ui/Message';

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
  const {
    formData,
    formYupMessages,
    formApiMessages,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className="authForm">
      <div className="titleForm">
        <h2>Log in</h2>
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
            {renderMessages(formYupMessages, 'red')}
          </Fragment>
        ))}
        <div className="buttonsForm">
          <Button className="nextButton">Connection</Button>
          {formApiMessages.apiError && renderMessages(formApiMessages, 'red')}
          {formApiMessages.apiError === 'Email not verified' && (
            <Button
              children={'Send another email'}
              onClick={() => resendEmailConfirmation(formData.email)}
            />
          )}
          <Button
            children={'Forgot password?'}
            className="forgotPasswordButton"
          />
        </div>
      </form>
      <p>
        Don't have an account ? <span>Sign up</span>
      </p>
      <img src={logo} alt="logo" />
    </div>
  );
}
