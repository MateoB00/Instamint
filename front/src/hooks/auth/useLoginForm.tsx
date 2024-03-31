import { useState, ChangeEvent, FormEvent } from 'react';
import { shemaLogin, catchErrors } from '../../utils/yup/yup';
import { authLogin } from '../../api/auth';
import { ErrorsYup } from '../../interfaces/yup';
import { FormApiMessages } from '../../interfaces/formMessages';

export const useLoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formYupMessages, setFormYupMessages] = useState<ErrorsYup>();
  const [formApiMessages, setFormApiMessages] = useState<FormApiMessages>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormYupMessages({ email: '', password: '' });

    shemaLogin
      .validate(formData, { abortEarly: false })
      .then(async () => {
        const response = await authLogin(formData.email, formData.password);

        if (response.error) {
          setFormApiMessages({
            apiSuccess: '',
            apiError: response.message,
          });
        }
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
