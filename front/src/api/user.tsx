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

export const enableTwoAuth = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/user/enable-two-auth`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  );

  return response.json();
};

export const deleteUser = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  return response.json();
};

export const getMinterByLink = async (link: string | undefined) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${link}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  return response.json();
};
