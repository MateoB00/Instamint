import { object, string, ref, ValidationError } from 'yup';
import { FormAuthMessages } from '../interfaces/formMessages';

export const shemaLogin = object().shape({
  email: string().email().required('Email is required'),
  password: string().required('Password is required'),
});

export const shemaChangeUsername = object().shape({
  username: string().required('Username is required'),
  apiError: string(),
});

export const shemaRegister = object().shape({
  email: string().email().required('Email is required'),
  username: string()
    .required()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters'),
  password: string()
    .min(10, 'Password must be at least 10 characters long')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,}$/u,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    ),
  confirmPassword: string().oneOf([ref('password')], 'Passwords must match'),
});

export const catchErrors = (errors: ValidationError) => {
  const newErrors: FormAuthMessages = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    apiError: '',
    apiSuccess: '',
  };

  errors.inner.forEach((error: { message?: string; path?: string }) => {
    const { path } = error;
    if (path) {
      newErrors[path] = error.message || `Error ${path}`;
    }
  });

  return newErrors;
};
