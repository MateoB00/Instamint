import ListNotifications from '../../components/userProfile/notificationProfile';

const notificationsPage = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-2xl font-bold text-center mb-4">Your Notifications</h1>
    <ListNotifications />
  </div>
);

export default notificationsPage;
