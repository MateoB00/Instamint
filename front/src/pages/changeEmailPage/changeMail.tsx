import { useState } from 'react';
import '../../scss/pages/auth/authPage.scss';
import '../../scss/pages/auth/authPageResponsive.scss';
import logo from '../../assets/Image/logo-instamint.svg';
import LoginForm from '../../components/ui/authForms/loginForm';
import RegisterForm from '../../components/ui/authForms/registerForm';
import ChangeEmailForm from '../../components/ui/changeEmailForms/changeEmailForm';

export default function ChangeEmail() {
  const [showConnexion, setShowConnexion] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);

  return (
    <section className="authPage">
      <div className="leftSide">
        <img src={logo} alt="logo" />
      </div>
      <div className="rightSide">
        <img src={logo} alt="logo" />
        <h1>Trade your NFTs, it's now!</h1>
        <div className="buttons">
          <button
            disabled={showRegister || showConnexion || showChangeEmail}
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
          <span>or</span>
          <button
            disabled={showRegister || showConnexion || showChangeEmail}
            onClick={() => setShowConnexion(true)}
          >
            Log in
          </button>
          <button
            disabled={showRegister || showConnexion || showChangeEmail}
            onClick={() => setShowChangeEmail(true)}
          >
            Change Email
          </button>
        </div>
      </div>

      {showConnexion && (
        <div className="popUp">
          <button onClick={() => setShowConnexion(false)} className="cross">
            ✕
          </button>
          <LoginForm />
        </div>
      )}

      {showRegister && (
        <div className="popUp">
          <button onClick={() => setShowRegister(false)} className="cross">
            ✕
          </button>
          <RegisterForm />
        </div>
      )}

      {showChangeEmail && (
        <div className="popUp">
          <button onClick={() => setShowChangeEmail(false)} className="cross">
            ✕
          </button>
          <ChangeEmailForm />
        </div>
      )}
    </section>
  );
}
