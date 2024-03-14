import { object, string } from 'yup';

export const shemaLogin = object().shape({
  email: string().email().required('Email is required'),
  password: string().required('Password is required'),
});

export const shemaChangeUsername = object().shape({
  username: string().required('Username is required'),
  apiError: string(),
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
