import { useEffect } from 'react';
import '../../scss/components/userProfile/cardProfile/cardProfile.scss';
import '../../scss/components/userProfile/cardProfile/cardProfileResponsive.scss';
import { UserInterface } from '../../interfaces/userData';
import { initializeBackgroundUserProfile } from '../../utils/granim';
import EditPicture from '../ui/profile/EditPicture';
import { useEditPicture } from '../../hooks/useEditPicture';
import { t } from 'i18next';
interface Props {
  userData: UserInterface;
}

export default function CardProfile({ userData }: Props) {
  const { handleProfilePictureChange, handleRestoreOriginal, handleSaveClick } =
    useEditPicture();
  useEffect(() => {
    initializeBackgroundUserProfile();
  });

  return (
    <div className="cardProfile">
      <canvas id="canvas-basic"></canvas>
      <div className="profilePicture">
        <img src={userData.profilePicture} alt="profilePicture" />
        <EditPicture
          handleProfilePictureChange={handleProfilePictureChange}
          handleRestoreOriginal={handleRestoreOriginal}
          handleSaveClick={handleSaveClick}
        />
      </div>
      <div className="userDatas">
        <div className="userInfos">
          <h1>
            {userData.username} | {userData.language}
          </h1>
          <p>{userData.bio}</p>
        </div>
        <div className="userStats">
          <div className="followersDatas">
            <span className="data">0</span>
            <span>{t('userProfile.followers')}</span>
          </div>
          <div className="followingsDatas">
            <span className="data">0</span>
            <span>{t('userProfile.following')}</span>
          </div>
          <div className="nftsDatas">
            <span className="data">0</span>
            <span>NFTs</span>
          </div>
          <div className="draftsDatas">
            <span className="data">0</span>
            <span>Drafts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
