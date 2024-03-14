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

  window.location.href = '/';

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
