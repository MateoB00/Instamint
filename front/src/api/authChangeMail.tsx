export const authChangeEmail = async (
  currentEmail: string,
  newEmail: string,
) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/change-email`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ currentEmail, newEmail }),
    },
  );

  if (response.status === 200) {
    return await response.json();
  }
  const error = await response.json();
  throw new Error(error.message || 'Failed to change email');
};
