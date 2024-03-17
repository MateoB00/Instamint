import { useState, ChangeEvent, FormEvent } from 'react';
import { shemaRegister, catchErrors } from '../utils/yup';
import { authRegister } from '../api/auth';

const HTTP_OK = 201;

export const useRegisterForm = () => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
