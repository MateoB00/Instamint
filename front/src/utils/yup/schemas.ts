import { object, string, ref, boolean, array, date } from 'yup';

export const schemaLogin = object().shape({
  email: string().email().required('Email is required'),
  password: string().required('Password is required'),
});

export const schemaRegister = object().shape({
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

export const schemaUpdateUser = object().shape({
  searchByEmailOrPhoneEnabled: boolean(),
  username: string().min(4),
  uniqueLink: string().min(6).matches(/^\S*$/u, 'Link cannot contain spaces'),
  twoFactorEnabled: boolean(),
});

export const schemaDraft = object().shape({
  title: string().nullable(),
  description: string()
    .min(5)
    .test('no-at-tags', 'Description cannot contain @', (value) =>
      typeof value === 'string' ? !/@\w+/u.test(value) : true,
    )
    .test('no-hashtags', 'Description cannot contain #', (value) =>
      typeof value === 'string' ? !/#\w+/u.test(value) : true,
    )
    .required('Description is required'),
  hashtags: array().nullable().max(5),
  location: string().nullable(),
  mediaUrl: string().url('Invalid URL format'),
});

export const schemaTeabag = object().shape({
  name: string().min(2).required('Name is required'),
  bio: string().min(5).required('Bio is required'),
  link: string()
    .min(3)
    .matches(/^\S*$/u, 'Link cannot contain spaces')
    .required('Link is required'),
  whitelistStartDate: date().nullable().notRequired(),
});

export const schemaTeabagUpdate = object().shape({
  name: string().min(2),
  bio: string().min(5),
  link: string().min(3).matches(/^\S*$/u, 'Link cannot contain spaces'),
});
