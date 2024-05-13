import { useState } from 'react';
import '../../scss/pages/auth/authPage.scss';
import '../../scss/pages/auth/authPageResponsive.scss';
import logo from '../../assets/Image/logo-instamint.svg';
import RegisterForm from '../../components/ui/forms/registerForm/registerForm';
import TestLoginForm from '../../components/ui/forms/loginForm/loginForm';
import { t } from 'i18next';
import { Link } from 'react-router-dom';

export default function AuthPage() {
  const [showConnexion, setShowConnexion] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const handleShowRegister = () => setShowRegister((value) => !value);
  const handleShowConnexion = () => setShowConnexion((value) => !value);

  return (
    <section className="authPage">
      <div className="leftSide">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="rightSide">
        <h1>{t('auth.title')}</h1>
        <h2>{t('button.signup')}</h2>
        <div className="buttons">
          <button
            disabled={Boolean(showRegister || showConnexion)}
            onClick={handleShowRegister}
          >
            {t('button.signup')}
          </button>
          <span>or</span>
          <button
            disabled={Boolean(showRegister || showConnexion)}
            onClick={handleShowConnexion}
          >
            {t('button.login')}
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
