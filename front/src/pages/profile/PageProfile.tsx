/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import '../../scss/pages/profile/PageProfile.scss';
import EditPicture from '../../components/ui/profile/EditPicture';
import { useTranslation } from 'react-i18next';
import { authChangePicture, getUserData } from '../../api/auth';
import { Link } from 'react-router-dom';

const PageProfile: React.FC = () => {
  const initialProfilePicture = '../src/assets/Image/user.jpg';
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture);
  const [originalProfilePicture, setOriginalProfilePicture] = useState(
    initialProfilePicture,
  );
  const [formErrors, setFormErrors] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null);

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target?.result as string;
        setProfilePicture(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRestoreOriginal = () => {
    setProfilePicture(originalProfilePicture);
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    try {
      const response = await authChangePicture(profilePicture);

      if (response.success) {
        setOriginalProfilePicture(profilePicture);
      } else {
        setFormErrors(response.message);
      }
    } catch (error) {
      setFormErrors('An error occurred while uploading the profile picture.');
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // eslint-disable-next-line no-shadow
        const userData = await getUserData();
        setUserData(userData);
      } catch (error) {
        setFormErrors('An error occurred while fetching user data.');
      }
    };

    fetchUserData();
  }, []);

  const { t } = useTranslation();

  return (
    <div className="popup-content">
      <h1>{t('popup.profile.title')}</h1>
      {userData && (
        <>
          <EditPicture
            handleProfilePictureChange={handleProfilePictureChange}
            handleRestoreOriginal={handleRestoreOriginal}
            profilePicture={userData.profilePicture}
          />
        </>
      )}
      <div>
        {formErrors && <span style={{ color: 'red' }}>{formErrors}</span>}
      </div>
      <div>
        <button className="save" onClick={handleSaveClick} title="Save">
          {t('popup.profile.save')}
        </button>
      </div>
      <Link to="/">return to home</Link>
    </div>
  );
};

export default PageProfile;
