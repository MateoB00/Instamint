export const userUpdate = async (formData: object) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
  });

  return response.json();
};
