import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth/authPage';
import ChangeUserNamePage from './pages/changeUserName/changeUserName';
import AuthChangeEmail from './components/ui/changeEmailForms/changeEmailForm';

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/changeusername" element={<ChangeUserNamePage />} />
      <Route path="/changeemail" element={< AuthChangeEmail />} />
    </Routes>
  );
}
