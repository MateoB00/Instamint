import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth/authPage';

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}
