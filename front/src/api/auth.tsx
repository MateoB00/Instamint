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
  if (response.status === HTTP_OK) {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    window.location.href = '/2faVerification';
  }
  if (response.status === 202) {
    window.location.href = '/me';
  }

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
      body: JSON.stringify(formData),
    },
  );

  if (response.status === HTTP_OK) {
    return response.status;
  }

  return response.json();
};

export async function verifyTwoFactor(otp: string) {
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/2fa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ otp, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to verify 2FA code');
    }

    if (response.ok) {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Failed to verify 2FA code. Please try again later.');
  }
}
