import { useState, ChangeEvent, FormEvent } from 'react';
import { shemaLogin, catchErrors } from '../utils/yup';
import { authLogin } from '../api/auth';

export const useLoginForm = () => {
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
