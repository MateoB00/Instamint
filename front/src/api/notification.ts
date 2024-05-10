import axios from 'axios';

interface MyNotification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
}
export const getMyNotifications = async (): Promise<MyNotification[]> =>
  await axios
    .get(`${import.meta.env.VITE_API_URL}/notifications`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => error);
