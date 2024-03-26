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

export const authChangePicture = async (profilePicture: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ profilePicture }),
  });

  if (response.status === 201) {
    return { success: true };
  }
  const errorData = await response.json();

  return { success: false, message: errorData.message };
};
