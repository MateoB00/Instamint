import axios from 'axios';
import { NftInterface } from '../interfaces/nftData';

export const createDraft = async (values: NftInterface) =>
  await axios
    .post(`${import.meta.env.VITE_API_URL}/nft/create-draft`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => response)
    .catch((error) => error);

export const updateDraft = async (values: NftInterface) =>
  await axios
    .put(`${import.meta.env.VITE_API_URL}/nft/update-draft`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => response)
    .catch((error) => error);

export const getAllDraftsByUser = async () =>
  await axios
    .get(`${import.meta.env.VITE_API_URL}/nft/allByUser`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => error);
