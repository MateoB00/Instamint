import { deleteUser } from '../../api/user';
import '../../scss/components/userProfile/deleteAccountProfile/deleteAccountProfile.scss';
import '../../scss/components/userProfile/deleteAccountProfile/deleteAccountResponsive.scss';

export default function DeleteAccountProfile() {
  const handleClick = () => {
    deleteUser().then(() => {
      window.location.href = '/auth';
    });
  };

  return (
    <div className="twoAuthProfile">
      <h1>Delete your account</h1>
      <button onClick={handleClick}>Delete Account</button>
    </div>
  );
}
