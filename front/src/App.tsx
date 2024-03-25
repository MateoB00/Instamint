import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/auth/authPage';
import ChangeUserNamePage from './pages/changeUserName/changeUserName';
import Profile from './pages/Profile/Profile';
import TwoFactorPage from './pages/auth/TwoFactorPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/changeusername" element={<ChangeUserNamePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/2faVerification" element={<TwoFactorPage />} />
    </Routes>
  );
}
