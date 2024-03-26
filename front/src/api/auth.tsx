const HTTP_OK = 201;

export const authLogin = async (email: string, password: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 401) {
    return await response.json();
  }

  window.location.href = '/me';

  return response.status;
};

export const authLogout = async () => {
  await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const resendEmailConfirmation = async (email: string) => {
  await fetch(`${import.meta.env.VITE_API_URL}/auth/resend-confirmation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
};

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
      credentials: 'include',
      body: JSON.stringify(formData),
    },
  );

  if (response.status === HTTP_OK) {
    return response.status;
  }

  return response.json();
};

// export const authChangePicture = async (profilePicture: string) => {
//   const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     credentials: 'include',
//     body: JSON.stringify({ profilePicture }),
//   });

//   if (response.status === HTTP_OK) {
//     return { success: true };
//   }
//   const errorData = await response.json();

//   return { success: false, message: errorData.message };
// };

export const getUserData = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  }
  throw new Error('Failed to fetch profile picture');
};
