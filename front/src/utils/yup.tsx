import { object, ref, string } from 'yup';

export const shemaLogin = object().shape({
  email: string().email().required('Email is required'),
  password: string().required('Password is required'),
});

export const shemaChangeUsername = object().shape({
  username: string().required('Username is required'),
  apiError: string(),
});

export const shemaRegister = object().shape({
  email: string().email('Invalid email format').required('Email is required'),
  username: string().min(3, 'Username must be at least 3 characters long').required('Username is required'),
  password: string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
})




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
