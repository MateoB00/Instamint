import { useState, ChangeEvent, FormEvent } from 'react';
import { shemaRegister, catchErrors } from '../../utils/yup/yup';
import { authRegister } from '../../api/auth';
import { ErrorsYup } from '../../interfaces/yup';
import { FormApiMessages } from '../../interfaces/formMessages';

const HTTP_OK = 201;

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [formYupMessages, setFormYupMessages] = useState<ErrorsYup>({});

  const [formApiMessages, setFormApiMessages] = useState<FormApiMessages>({
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
        }
        if (response.error) {
          updatedErrors.apiError = response.message;
        }
        setFormApiMessages(updatedErrors);
      })
      .catch((errors) => {
        setFormYupMessages(catchErrors(errors));
      });
  };

  return {
    formData,
    formYupMessages,
    formApiMessages,
    handleChange,
    handleSubmit,
  };
};
