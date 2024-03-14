import { useState } from 'react';
import '../../scss/pages/auth/authPage.scss';
import '../../scss/pages/auth/authPageResponsive.scss';
import logo from '../../assets/Image/logo-instamint.svg';
import LoginForm from '../../components/ui/authForms/loginForm';

export default function AuthPage() {
  const [showConnexion, setShowConnexion] = useState(false);

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
        </div>
      )}
    </section>
  );
}
