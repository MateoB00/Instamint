import { object, string } from 'yup';

export const shemaLogin = object().shape({
  email: string().email().required('Email is required'),
  password: string().required('Password is required'),
});

export const shemaChangeUsername = object().shape({
  username: string().required('Username is required'),
  apiError: string(),
});
export const shemaChangeEmail = object().shape({
  email: string().email().required('Current email is required'),
  newEmail: string().email().required('New email is required'),
});

export const catchErrors = (errors) => {
  const newErrors = {};
  errors.inner.forEach((error) => {
    const { path } = error;
    if (path) {
      newErrors[path] = error.message;
    }
  });

  return newErrors;
};
