import { Fragment } from 'react';
import '../../../scss/components/ui/authForms/authForms.scss';
import '../../../scss/components/ui/authForms/authFormsResponsive.scss';
import logo from '../../../assets/Image/logo-instamint.svg';
import InputForm from '../InputForm';
import { useLoginForm } from '../../../hooks/useLoginForm';
import { resendEmailConfirmation } from '../../../api/auth';
import { t } from 'i18next';
import Button from '../Button';

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
            <InputForm
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
          <Button className="nextButton">{t('button.login')}</Button>
          {formMessages.apiError && (
            <span style={{ color: 'red' }}>{formMessages.apiError}</span>
          )}
          {formMessages.apiError === 'Email not verified' && (
            <Button onClick={() => resendEmailConfirmation(formData.email)}>
              {t('sendEmailAgain')}
            </Button>
          )}
          <Button className="forgotPasswordButton">
            {t('forgotPassword')}
          </Button>
        </div>
      </form>
      <p>
        {t('noAccount')} <span>{t('button.signup')}</span>
      </p>
      <img src={logo} alt="logo" />
    </div>
  );
}
