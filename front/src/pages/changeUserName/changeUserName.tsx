import '../../scss/pages/auth/authPage.scss';
import '../../scss/pages/auth/authPageResponsive.scss';
import logo from '../../assets/Image/logo-instamint.svg';
import ChangeUsernameForm from '../../components/ui/changeUserNameForms/changeUserNameForms'; 

export default function ChangeUserNamePage() {
  return (
    <section className="authPage">
      <div className="leftSide">
        <img src={logo} alt="logo" />
      </div>
      <div className="rightSide">
        <img src={logo} alt="logo" />
        <h1>Trade your NFTs, it's now!</h1>
        <h2>Welcome</h2>
        <ChangeUsernameForm />
      </div>
    </section>
  );
}
