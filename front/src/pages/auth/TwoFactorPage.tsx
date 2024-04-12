import '../../scss/pages/auth/authPage.scss';
import '../../scss/pages/auth/authPageResponsive.scss';
import logo from '../../assets/Image/logo-instamint.svg';
import TwoFactorAuthForm from '../../components/ui/authForms/TwoFactorAuthForm';

export default function TwoFactorPage() {
  return (
    <section className="authPage">
      <div className="leftSide">
        <img src={logo} alt="logo" />
      </div>
      <div className="rightSide">
        <img src={logo} alt="logo" />
        <h1>Verification with 2FA.</h1>
        <div className="buttons">
          <TwoFactorAuthForm />
        </div>
      </div>
    </section>
  );
}
