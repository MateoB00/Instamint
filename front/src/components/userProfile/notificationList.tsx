import '../../scss/pages/notifications/notificationList.scss';
import { useEffect, useState } from 'react';
import { getMyNotifications } from '../../api/notification';
import { Notification } from '../../interfaces/notif';

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null,
  );

  useEffect(() => {
    async function fetchNotifications() {
      const responseGetNotifications = await getMyNotifications();
      setNotifications(responseGetNotifications);
    }
    fetchNotifications();
  }, []);

  return (
    <section className="allNotifications">
      {notifications ? (
        notifications.map((notification) => (
          <div key={notification.id} className="notification">
            <span className="notificationTitle">
              Title: {notification.title}
            </span>
            <span className="notificationMessage">
              Message: {notification.message.slice(0, 50)}
              {notification.message.length > 50 ? '...' : ''}
            </span>
            <span className="notificationTimestamp">
              Date:{' '}
              {new Date(notification.timestamp).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ))
      ) : (
        <div className="loading">Loading...</div>
      )}
    </section>
  );
}
