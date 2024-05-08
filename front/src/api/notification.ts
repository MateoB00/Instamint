import axios from 'axios';
import { Notification } from '../interfaces/notif';

export const getMyNotifications = async (): Promise<Notification[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/notifications/me/notifications`, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return response.data;
};
