const BAD_REQUEST = 400;

export const uploadOriginalContent = async (formData: FormData) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/original-content/upload`,
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

export const getAllOriginalContentsByUser = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/original-content/allByUser`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (response.status === BAD_REQUEST) {
    return response.status;
  }

  return await response.json();
};
