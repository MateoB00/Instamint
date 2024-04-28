import { NftInterface } from '../interfaces/nftData';

const BAD_REQUEST = 400;

export const createDraft = async (formDataDraft: NftInterface) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/nft/create-draft`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formDataDraft),
    },
  );

  return response;
};

export const updateDraft = async (formDataDraft: NftInterface) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/nft/update-draft`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formDataDraft),
    },
  );

  return response;
};

export const getAllDraftsByUser = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/nft/allByUser`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  );

  if (response.status === BAD_REQUEST) {
    return response.status;
  }

  return await response.json();
};
