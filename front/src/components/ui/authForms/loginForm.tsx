import { useState, Fragment, ChangeEvent, FormEvent } from 'react';
import '../../../scss/components/ui/authForms/authForms.scss';
import '../../../scss/components/ui/authForms/authFormsResponsive.scss';
import logo from '../../../assets/Image/logo-instamint.svg';
import Input from '../../../components/ui/Input';
import { shemaLogin, catchErrors } from '../../../utils/yup';
import { authLogin, resendEmailConfirmation } from '../../../api/auth';

const useLoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formMessages, setFormMessages] = useState({
    email: '',
    password: '',
    apiError: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormMessages({ email: '', password: '', apiError: '' });

    shemaLogin
      .validate(formData, { abortEarly: false })
      .then(async () => {
        const response = await authLogin(formData.email, formData.password);

        if (response.error) {
          setFormMessages({
            email: '',
            password: '',
            apiError: response.message,
          });
        }
      })
      .catch((errors) => {
        setFormMessages(catchErrors(errors));
      });
  };

  return { formData, formMessages, handleChange, handleSubmit };
};

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
