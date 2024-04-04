import { Fragment, useState } from 'react';
import '../../scss/components/userProfile/twoAuthProfile/twoAuthProfile.scss';
import '../../scss/components/userProfile/twoAuthProfile/twoAuthProfileResponsive.scss';
import { UserInterface } from '../../interfaces/userData';
import QRCode from 'qrcode.react';
import { enableTwoAuth } from '../../api/user';

type FetchUserDataFunction = () => void;

interface Props {
  userData: UserInterface | null | undefined;
  fetchUserData: FetchUserDataFunction;
}

export default function TwoFactorProfile({ userData, fetchUserData }: Props) {
  const [error, setError] = useState('');

  const handleClick = () => {
    enableTwoAuth()
      .then(() => {
        fetchUserData();
        setError('');
      })
      .catch(() => {
        setError('Error in server');
      });
  };

  return (
    <div className="twoAuthProfile">
      <h1>Your Secret for 2FA</h1>
      <Fragment>
        {userData && <QRCode value={`${userData.otpPath}`} />}
      </Fragment>
      <button onClick={handleClick}>
        {userData?.twoFactorEnabled ? '2FA is enabled' : '2FA is disable'}
      </button>
      <span>{error}</span>
    </div>
  );
}
