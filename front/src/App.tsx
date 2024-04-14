import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/auth/authPage';
import ChangeUserNamePage from './pages/changeUserName/changeUserName';
import AuthChangeEmail from './components/ui/changeEmailForms/changeEmailForm';
import UserProfile from './pages/userProfile/userProfile';
import TwoFactorPage from './pages/auth/TwoFactorPage';
import PasswordResetPage from './pages/auth/passwordReset';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/changeusername" element={<ChangeUserNamePage />} />
      <Route path="/changeemail" element={<AuthChangeEmail />} />
      <Route path="/me" element={<UserProfile />} />
      <Route path="/2faVerification" element={<TwoFactorPage />} />
      <Route path="/reset-password/:token" element={<PasswordResetPage />} />
    </Routes>
  );
}
