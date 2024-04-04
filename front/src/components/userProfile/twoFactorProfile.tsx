import { Fragment } from 'react';
import '../../scss/components/userProfile/updateProfile/updateProfile.scss';
import '../../scss/components/userProfile/updateProfile/updateProfileResponsive.scss';
import { UserInterface } from '../../interfaces/userData';
import QRCode from 'qrcode.react';

interface Props {
  userData: UserInterface | null | undefined;
}

export default function twoFactorProfile({ userData }: Props) {
  return (
    <div className="updateProfile">
      <div className="personalInformations">
        <h1>Your Secret for 2FA</h1>
        <Fragment>
          {userData && <QRCode value={`${userData.otpPath}`} />}
        </Fragment>
      </div>
    </div>
  );
}
