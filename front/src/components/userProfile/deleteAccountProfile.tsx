import { deleteUser } from '../../api/user';
import '../../scss/components/userProfile/deleteAccountProfile/deleteAccountProfile.scss';
import '../../scss/components/userProfile/deleteAccountProfile/deleteAccountResponsive.scss';
import { useTranslation } from 'react-i18next';

export default function DeleteAccountProfile() {
  const handleClick = () => {
    deleteUser().then(() => {
      window.location.href = '/auth';
    });
  };
  const { t } = useTranslation();

  return (
    <div className="twoAuthProfile">
      <h1>{t('deleteAccount')}</h1>
      <button onClick={handleClick}>{t('deleteAccountProfile')}</button>
    </div>
  );
}
