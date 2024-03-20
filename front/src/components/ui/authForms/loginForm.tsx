import { Fragment } from 'react';
import '../../../scss/components/ui/authForms/authForms.scss';
import '../../../scss/components/ui/authForms/authFormsResponsive.scss';
import logo from '../../../assets/Image/logo-instamint.svg';
import Input from '../../../components/ui/Input';
import { useLoginForm } from '../../../hooks/useLoginForm';
import { resendEmailConfirmation } from '../../../api/auth';
import { t } from 'i18next';

const fieldsForm = [
  {
    name: 'email',
    type: 'email',
    label: t('label.email'),
    placeholder: t('placeholder.email'),
  },
  {
    name: 'password',
    type: 'password',
    label: t('label.password'),
    placeholder: t('placeholder.password'),
  },
];

export default function LoginForm() {
  const { formData, formMessages, handleChange, handleSubmit } = useLoginForm();

  return (
    <div className="authForm">
      <div className="titleForm">
        <h2>{t('button.login')}</h2>
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
          <button className="nextButton">{t('button.login')}</button>
          {formMessages.apiError && (
            <span style={{ color: 'red' }}>{formMessages.apiError}</span>
          )}
          {formMessages.apiError === 'Email not verified' && (
            <button onClick={() => resendEmailConfirmation(formData.email)}>
              {t('sendEmailAgain')}
            </button>
          )}
          <button className="forgotPasswordButton">
            {t('forgotPassword')}
          </button>
        </div>
      </form>
      <p>
        {t('noAccount')} <span>{t('button.signup')}</span>
      </p>
      <img src={logo} alt="logo" />
    </div>
  );
}
