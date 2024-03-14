import { useState, Fragment } from 'react';
import '../../../scss/components/ui/authForms/authForms.scss';
import '../../../scss/components/ui/authForms/authFormsResponsive.scss';
import logo from '../../../assets/Image/logo-instamint.svg';
import Input from '../../../components/ui/Input';
import { shemaLogin, catchErrors } from '../../../utils/yup';
import { authLogin } from '../../../api/auth';

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
  const { formData, formErrors, handleChange, handleSubmit } = useLoginForm();

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
              value={formData[field.name]}
              onChange={handleChange}
            />
            {formErrors[field.name] && (
              <span style={{ color: 'red' }}>{formErrors[field.name]}</span>
            )}
          </Fragment>
        ))}
        <div className="buttonsForm">
          <button className="nextButton">Connection</button>
          {formErrors.apiError && (
            <span style={{ color: 'red' }}>{formErrors.apiError}</span>
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
