/* eslint-disable max-lines-per-function */
import { useState } from 'react';
import '../../scss/pages/auth/authPage.scss';
import '../../scss/pages/auth/authPageResponsive.scss';
import logo from '../../assets/Image/logo-instamint.svg';
import LoginForm from '../../components/ui/authForms/loginForm';
import RegisterForm from '../../components/ui/authForms/registerForm';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function AuthPage() {
  const { t } = useTranslation();
  const [showConnexion, setShowConnexion] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <section className="authPage">
      <div className="leftSide">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="rightSide">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <h1>{t('auth.title')}</h1>
        <h2>{t('button.signup')}</h2>
        <div className="buttons">
          <button
            disabled={Boolean(showRegister || showConnexion)}
            onClick={() => setShowRegister(true)}
          >
            {t('button.signup')}
          </button>
          <span>or</span>
          <button
            disabled={Boolean(showRegister || showConnexion)}
            onClick={() => setShowConnexion(true)}
          >
            {t('button.login')}
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
    </section>
  );
}
