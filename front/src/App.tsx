import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/auth/authPage';
import ChangeUserNamePage from './pages/changeUserName/changeUserName';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/changeusername" element={<ChangeUserNamePage />} />
    </Routes>
  );
}
