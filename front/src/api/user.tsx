export const getMe = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.status === 401) {
    return await response.status;
  }

  return response.json();
};
