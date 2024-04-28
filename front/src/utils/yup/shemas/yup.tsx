import { object, string, ref, ValidationError, boolean, array } from 'yup';
import { ErrorsYup } from '../../../interfaces/yup';

export const shemaLogin = object().shape({
  email: string().email().required('Email is required'),
  password: string().required('Password is required'),
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

export const shemaUpdateUser = object().shape({
  searchByEmailOrPhoneEnabled: boolean(),
  username: string().min(4),
});

export const shemaDraft = object().shape({
  title: string().nullable(),
  description: string()
    .min(5)
    .test('no-at-tags', 'Description cannot contain @', (value) =>
      typeof value === 'string' ? !/@\w+/u.test(value) : true,
    )
    .test('no-hashtags', 'Description cannot contain #', (value) =>
      typeof value === 'string' ? !/#\w+/u.test(value) : true,
    ),
  hashtags: array().nullable().max(5),
  location: string().nullable(),
  mediaUrl: string().url('Invalid URL format'),
});

export const catchErrors = (errors: ValidationError) => {
  const newErrors: ErrorsYup = {};
  errors.inner.forEach((error: { message?: string; path?: string }) => {
    const { path } = error;
    if (path) {
      newErrors[path] = error.message || `Error ${path}`;
    }
  });

  return newErrors;
};
