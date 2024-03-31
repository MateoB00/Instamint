import '../../scss/components/userProfile/updateProfile/updateProfile.scss';
import '../../scss/components/userProfile/updateProfile/updateProfileResponsive.scss';

export default function UpdateProfile() {
  return (
    <>
      <div className="updateProfile">
        <div className="personalInformations">
          <h1>Personal Informations</h1>
          <form></form>
        </div>
        <div className="confidentialInformations">
          <h2>Confidential Informations</h2>
          <form></form>
        </div>
      </div>
    </>
  );
}
