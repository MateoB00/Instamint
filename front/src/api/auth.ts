import axios from 'axios';
import { HTTP_SUCCESS } from '../constants/statusCodes';

export const authLogin = async (values: { email: string; password: string }) =>
  await axios
    .post(`${import.meta.env.VITE_API_URL}/auth/login`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      if (response.status === HTTP_SUCCESS.CREATED) {
        localStorage.setItem('email', values.email);
        localStorage.setItem('password', values.password);
        window.location.href = '/2faVerification';
      }
      if (response.status === HTTP_SUCCESS.ACCEPTED) {
        window.location.href = '/me';
      }
    })
    .catch((error) => error.response.data);

export const authLogout = async () =>
  await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const resendEmailConfirmation = async (email: string) =>
  await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/resend-confirmation`,
    {
      email,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

export const authRegister = async (values: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) =>
  await axios
    .post(`${import.meta.env.VITE_API_URL}/auth/register`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response)
    .catch((error) => error.response.data);

export async function verifyTwoFactor(otp: string) {
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');

  return await axios
    .post(
      `${import.meta.env.VITE_API_URL}/auth/2fa`,
      {
        otp,
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    )
    .then((response) => {
      localStorage.removeItem('email');
      localStorage.removeItem('password');

      return response.data;
    })
    .catch((error) => {
      throw new Error(error || 'Failed to verify 2FA code');
    });
}

export const passwordResetRequest = async (email: string) =>
  await axios
    .post(
      `${import.meta.env.VITE_API_URL}/auth/reset-password-request`,
      {
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then((response) => response.status)
    .catch((error) => error);

export const passwordReset = async (
  token: string | null | undefined,
  password: string,
) =>
  await axios
    .post(
      `${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`,
      {
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then((response) => response.status)
    .catch((error) => error);
