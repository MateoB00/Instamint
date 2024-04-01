import { Fragment } from 'react';
import '../../../scss/components/ui/authForms/authForms.scss';
import '../../../scss/components/ui/authForms/authFormsResponsive.scss';
import logo from '../../../assets/Image/logo-instamint.svg';
import InputForm from '../InputForm';
import { useLoginForm } from '../../../hooks/auth/useLoginForm';
import { resendEmailConfirmation } from '../../../api/auth';
import Button from '../Button';
import { renderMessages, Message } from '../../ui/Message';
import { FormApiMessages } from '../../../interfaces/formMessages';

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
            {formYupMessages[field.name as keyof typeof formYupMessages] && (
              <Message
                message={
                  formYupMessages[field.name as keyof typeof formYupMessages]
                }
                color={'red'}
              />
            )}
          </Fragment>
        ))}
        <RenderButtons formApiMessages={formApiMessages} formData={formData} />
      </form>
      <p>
        Don't have an account ? <span>Sign up</span>
      </p>
      <img src={logo} alt="logo" />
    </div>
  );
}

interface RenderButtonsProps {
  formApiMessages: FormApiMessages;
  formData: { email: string; password: string };
}

const RenderButtons = ({ formApiMessages, formData }: RenderButtonsProps) => (
  <div className="buttonsForm">
    <Button children={'Connection'} className="nextButton" />
    {formApiMessages.apiError && renderMessages(formApiMessages, 'red')}
    {formApiMessages.apiError === 'Email not verified' && (
      <Button
        children={'Send another email'}
        onClick={() => resendEmailConfirmation(formData.email)}
      />
    )}
    <Button children={'Forgot password?'} className="forgotPasswordButton" />
  </div>
);
