import { useState, Fragment } from 'react';
import '../../../scss/components/ui/authForms/authForms.scss';
import '../../../scss/components/ui/authForms/authFormsResponsive.scss';
import logo from '../../../assets/Image/logo-instamint.svg';
import Input from '../../../components/ui/Input';
import { shemaRegister, catchErrors } from '../../../utils/yup';
import { authRegister } from '../../../api/auth';

const HTTP_OK = 201;

const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [formMessages, setFormMessages] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    apiError: '',
    apiSuccess: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    const updatedErrors = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      apiError: '',
      apiSuccess: '',
    };
    e.preventDefault();

    shemaRegister
      .validate(formData, { abortEarly: false })
      .then(async () => {
        const response = await authRegister(formData);

        if (response === HTTP_OK) {
          updatedErrors.apiSuccess = 'Confirmation email has been sent';
          setFormMessages(updatedErrors);
        }
        if (response.error) {
          updatedErrors.apiError = response.message;
          setFormMessages(updatedErrors);
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
              value={formData[field.name]}
              onChange={handleChange}
            />
            {formMessages[field.name] && (
              <span style={{ color: 'red' }}>{formMessages[field.name]}</span>
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
