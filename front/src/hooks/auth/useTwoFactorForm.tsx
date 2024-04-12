import { useState, ChangeEvent, FormEvent } from 'react';
import { verifyTwoFactor } from '../../api/auth';

export const useTwoFactorForm = () => {
  const [formData, setFormData] = useState({ code: '' });
  const [formMessages, setFormMessages] = useState({ code: '', apiError: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormMessages({ code: '', apiError: '' });

    try {
      const response = await verifyTwoFactor(formData.code);

      if (response.error) {
        setFormMessages({
          code: '',
          apiError: response.message,
        });
      }
      if (response.accessToken) {
        window.location.href = '/';
      }
    } catch (error) {
      setFormMessages({
        code: '',
        apiError: 'An error occurred. Please try again later.',
      });
    }
  };

  return { formData, formMessages, handleChange, handleSubmit };
};
