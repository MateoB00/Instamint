const HTTP_OK = 201;

export const authRegister = async (formData: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    },
  );

  if (response.status === HTTP_OK) {
    return response.status;
  }

  return response.json();
};
