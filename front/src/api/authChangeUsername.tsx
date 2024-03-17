export const authChangeUsername = async (newUsername: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/change-username`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ newUsername }),
    },
  );

  if (response.ok) {
    return { success: true };
  }
  const errorData = await response.json();

  return { success: false, message: errorData.message };
};
