import { useEffect, useState } from 'react';
import { Notification } from '../../interfaces/notif';
import { getMyNotifications } from '../../api/notification';
import '../../scss/pages/notifications/notificationList.scss';
const ListNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const formatDates = (notificationsList: Notification[]) => {
    notificationsList.forEach((notification) => {
      const date = new Date(notification.timestamp);
      notification.timestamp = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    });
  };

  useEffect(() => {
    getMyNotifications().then((res) => {
      formatDates(res);
      setNotifications(res);
    });
  });

  return (
    <div className="list-notifications-container">
      <h2>List of Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <h3>{notification.title}</h3>
            <p>{notification.message}</p>
            <div>{notification.timestamp}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListNotifications;
