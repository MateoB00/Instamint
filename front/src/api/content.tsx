const BAD_REQUEST = 400;

export const uploadContent = async (formData: FormData) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/content/upload`,
    {
      method: 'POST',
      credentials: 'include',
      body: formData,
    },
  );

  if (response.status === BAD_REQUEST) {
    return response.status;
  }

  return response.json();
};

export const getMyNFTS = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/content/mine`, {
    method: 'GET',
    credentials: 'include',
  });

  if (response.status === BAD_REQUEST) {
    return response.status;
  }

  return response.json();
};

export const getNFTsByUser = async (uniqueLink: string | undefined) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/content/${uniqueLink}/nfts`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (response.status === BAD_REQUEST) {
    return response.status;
  }

  return response.json();
};
