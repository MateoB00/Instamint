import axios from 'axios';

type MyNotification = {
  id: number;
  title: string;
  message: string;
  timestamp: string;
};
export const getMyNotifications = async (): Promise<{
  data: MyNotification[];
}> =>
  await axios
    .get(`${import.meta.env.VITE_API_URL}/notifications/me/notifications`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => error);
