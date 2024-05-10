import axios from 'axios';

interface ValuesCreate {
  name: string;
  bio: string;
  link: string;
  whitelist: boolean;
  whitelistStartDate?: Date | null;
}

export const create = async (values: ValuesCreate) =>
  await axios
    .post(`${import.meta.env.VITE_API_URL}/teabag/create`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => response)
    .catch((error) => error);

export const getOneTeabag = async (link: string) =>
  await axios
    .get(`${import.meta.env.VITE_API_URL}/teabag/${link}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((error) => error);

export const getAll = async () =>
  await axios
    .get(`${import.meta.env.VITE_API_URL}/teabag/all`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((error) => error);
