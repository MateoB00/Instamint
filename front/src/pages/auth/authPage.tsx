import { useState } from 'react';
import '../../scss/pages/auth/authPage.scss';
import '../../scss/pages/auth/authPageResponsive.scss';
import logo from '../../assets/Image/logo-instamint.svg';
import LoginForm from '../../components/ui/authForms/loginForm';

export default function AuthPage() {
  const [showConnexion, setShowConnexion] = useState(false);
=======
import RegisterForm from '../../components/ui/authForms/registerForm';

export default function AuthPage() {
  const [showRegister, setShowRegister] = useState(false);

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
            disabled={Boolean(showConnexion)}
            onClick={() => setShowConnexion(true)}
          >
            Log in
          </button>
        </div>
      </div>

      {showConnexion && (
        <div className="popUp">
          <button onClick={() => setShowConnexion(false)} className="cross">
            ✕
          </button>
          <LoginForm />
=======
            disabled={Boolean(showRegister)}
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
          <span>or</span>
        </div>
      </div>

      {showRegister && (
        <div className="popUp">
          <button onClick={() => setShowRegister(false)} className="cross">
            ✕
          </button>
          <RegisterForm />
        </div>
      )}
    </section>
  );
}
