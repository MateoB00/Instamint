import { useEffect } from 'react';
import '../../scss/components/userProfile/cardProfile/cardProfile.scss';
import '../../scss/components/userProfile/cardProfile/cardProfileResponsive.scss';
import { UserInterface } from '../../interfaces/userData';
import { initializeBackgroundProfile } from '../../utils/granim';

interface Props {
  userData: UserInterface;
}

export default function CardProfile({ userData }: Props) {
  useEffect(() => {
    initializeBackgroundProfile();
  });

  return (
    <div className="cardProfile">
      <canvas id="canvas-basic"></canvas>
      <div className="profilePicture">
        <img src={userData.profilePicture} alt="profilePicture" />
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
            <span>Followers</span>
          </div>
          <div className="followingsDatas">
            <span className="data">0</span>
            <span>Followings</span>
          </div>
          <div className="nftsDatas">
            <span className="data">0</span>
            <span>NFTs</span>
          </div>
          <div className="draftsDatas">
            <span className="data">0</span>
            <span>Drafts</span>
            <div className="commentsDatas">
              <span className="data">0</span>
              <span>Comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
