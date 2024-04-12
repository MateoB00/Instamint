import '../../scss/pages/auth/authPage.scss';
import '../../scss/pages/auth/authPageResponsive.scss';
import logo from '../../assets/Image/logo-instamint.svg';
import PasswordResetForm from '../../components/ui/authForms/passwordResetForm';
import { useParams } from 'react-router-dom';

export default function PasswordResetPage() {
  const { token } = useParams();

  return (
    <section className="authPage">
      <div className="leftSide">
        <img src={logo} alt="logo" />
      </div>
      <div className="rightSide">
        <img src={logo} alt="logo" />
        <h1>Password Reset.</h1>
        <div className="buttons">
          <PasswordResetForm token={token} />
        </div>
      </div>
    </section>
  );
}
