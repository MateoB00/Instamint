const BAD_REQUEST = 400;

export const getMyNotifications = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/notifications/me/notifications`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    },
  );

  if (response.status === BAD_REQUEST) {
    return response.status;
  }

  return response.json();
};
