import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/auth/authPage';
import UserProfile from './pages/userProfile/userProfile';
import TwoFactorPage from './pages/auth/TwoFactorPage';
import PasswordResetPage from './pages/auth/passwordReset';
import MinterPage from './pages/searchPage/minterPage';
import NotificationsPage from './pages/userProfile/NotificationPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/me" element={<UserProfile />} />
      <Route path="/2faVerification" element={<TwoFactorPage />} />
      <Route path="/reset-password/:token" element={<PasswordResetPage />} />
      <Route path="/other-minter/:link" element={<MinterPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
    </Routes>
  );
}
