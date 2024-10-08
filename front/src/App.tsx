import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/auth/authPage';
import UserProfile from './pages/userProfile/userProfile';
import TwoFactorPage from './pages/auth/TwoFactorPage';
import PasswordResetPage from './pages/auth/passwordReset';
import NotificationsPage from './pages/userProfile/NotificationPage';
import Teabag from './pages/teabag/teabag';
import TeabagProfile from './pages/teabag/teabagProfile';
import CommentSection from './components/userProfile/comments';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/me" element={<UserProfile />} />
      <Route path="/2faVerification" element={<TwoFactorPage />} />
      <Route path="/reset-password/:token" element={<PasswordResetPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/teabag" element={<Teabag />} />
      <Route path="/teabag/:link" element={<TeabagProfile />} />
      <Route path="/nft/:id/comments" element={<CommentSection nftId={''} />} />
    </Routes>
  );
}
