import { Fragment } from 'react';
import '../../../scss/components/ui/authForms/authForms.scss';
import '../../../scss/components/ui/authForms/authFormsResponsive.scss';
import logo from '../../../assets/Image/logo-instamint.svg';
import InputForm from '../InputForm';
import { useRegisterForm } from '../../../hooks/useRegisterForm';
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
    name: 'username',
    type: 'text',
    label: t('label.username'),
    placeholder: t('placeholder.username'),
  },
  {
    name: 'password',
    type: 'password',
    label: t('label.password'),
    placeholder: t('placeholder.password'),
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: t('label.confirm.password'),
    placeholder: t('placeholder.confirm.password'),
  },
];

export default function RegisterForm() {
  const { formData, formMessages, handleChange, handleSubmit } =
    useRegisterForm();

  return (
    <div className="authForm">
      <div className="titleForm">
        <h2>{t('button.signup')}</h2>
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
        {formMessages.apiError && (
          <span style={{ color: 'red' }}>{formMessages.apiError}</span>
        )}
        {formMessages.apiSuccess && (
          <span style={{ color: '#16502d' }}>{formMessages.apiSuccess}</span>
        )}
        <div className="buttonsForm">
          <Button className="nextButton">{t('button.next')}</Button>
        </div>
      </form>
      <p>
        {t('account')} <span>{t('button.login')}</span>
      </p>
      <img src={logo} alt="logo" />
    </div>
  );
}
