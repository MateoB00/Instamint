import axios from 'axios';

await axios
  .get(`${import.meta.env.VITE_API_URL}/notifications/me/notifications`, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
  .then((response) => response)
  .catch((error) => error);
