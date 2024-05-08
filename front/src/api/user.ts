import axios from 'axios';

export const getMe = async () =>
  await axios
    .get(`${import.meta.env.VITE_API_URL}/user/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => error.response.data.status);

export const userUpdate = async (formData: object) =>
  await axios
    .put(`${import.meta.env.VITE_API_URL}/user/me`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => error);

export const enableTwoAuth = async () =>
  await axios
    .put(
      `${import.meta.env.VITE_API_URL}/user/enable-two-auth`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    )
    .then((response) => response)
    .catch((error) => error);

export const deleteUser = async () =>
  await axios
    .delete(`${import.meta.env.VITE_API_URL}/user/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => response)
    .catch((error) => error);
