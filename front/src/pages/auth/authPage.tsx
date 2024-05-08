import { useState } from 'react';
import '../../scss/pages/auth/authPage.scss';
import '../../scss/pages/auth/authPageResponsive.scss';
import logo from '../../assets/Image/logo-instamint.svg';
import RegisterForm from '../../components/ui/forms/registerForm/registerForm';
import TestLoginForm from '../../components/ui/forms/loginForm/loginForm';

export default function AuthPage() {
  const [showConnexion, setShowConnexion] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleShowRegister = () => setShowRegister((value) => !value);
  const handleShowConnexion = () => setShowConnexion((value) => !value);

  return (
    <section className="authPage">
      <div className="leftSide">
        <img src={logo} alt="logo" />
      </div>
      <div className="rightSide">
        <img src={logo} alt="logo" />
        <h1>Trade your NFTs, it's now!</h1>
        <h2>Sign up.</h2>
        <div className="buttons">
          <button
            disabled={Boolean(showRegister || showConnexion)}
            onClick={handleShowRegister}
          >
            Register
          </button>
          <span>or</span>
          <button
            disabled={Boolean(showRegister || showConnexion)}
            onClick={handleShowConnexion}
          >
            Log in
          </button>
        </div>
      </div>

      {showConnexion && (
        <div className="popUp">
          <button onClick={handleShowConnexion} className="cross">
            ✕
          </button>
          <TestLoginForm />
        </div>
      )}

      {showRegister && (
        <div className="popUp">
          <button onClick={handleShowRegister} className="cross">
            ✕
          </button>
          <RegisterForm />
        </div>
      )}
    </section>
  );
}
