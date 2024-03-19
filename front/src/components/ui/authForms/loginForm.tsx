import { useState, Fragment } from 'react';
import '../../../scss/components/ui/authForms/authForms.scss';
import '../../../scss/components/ui/authForms/authFormsResponsive.scss';
import logo from '../../../assets/Image/logo-instamint.svg';
import Input from '../../../components/ui/Input';
import { t } from 'i18next';
import { shemaLogin, catchErrors } from '../../../utils/yup';
import { authLogin, resendEmailConfirmation } from '../../../api/auth';

const useLoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    apiError: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({ email: '', password: '', apiError: '' });

    shemaLogin
      .validate(formData, { abortEarly: false })
      .then(async () => {
        const response = await authLogin(formData.email, formData.password);

        if (response.error) {
          setFormErrors({
            email: '',
            password: '',
            apiError: response.message,
          });
        }
      })
      .catch((errors) => {
        setFormErrors(catchErrors(errors));
      });
  };

  return { formData, formErrors, handleChange, handleSubmit };
};

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
  const { formData, formErrors, handleChange, handleSubmit } = useLoginForm();

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
              value={formData[field.name]}
              onChange={handleChange}
            />
            {formErrors[field.name] && (
              <span style={{ color: 'red' }}>{formErrors[field.name]}</span>
            )}
          </Fragment>
        ))}
        <div className="buttonsForm">
          <button className="nextButton">{t('button.login')}</button>
          {formErrors.apiError && (
            <span style={{ color: 'red' }}>{formErrors.apiError}</span>
          )}
          {formErrors.apiError === 'Email not verified' && (
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
