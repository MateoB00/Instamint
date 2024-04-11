export const uploadContent = async (formData: FormData) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/firebase/upload`,
    {
      method: 'POST',
      credentials: 'include',
      body: formData,
    },
  );

  if (response.status === 401) {
    return response.status;
  }

  return response.json();
};
