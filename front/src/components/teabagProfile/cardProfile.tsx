import { useEffect } from 'react';
import '../../scss/components/teabagProfile/cardProfile/cardProfile.scss';
import { initializeBackgroundProfile } from '../../utils/granim';
import { TeabagInterface } from '../../interfaces/teabag';

interface Props {
  teabagData: TeabagInterface;
}

export default function CardProfile({ teabagData }: Props) {
  useEffect(() => {
    initializeBackgroundProfile();
  });

  return (
    <div className="cardProfile">
      <canvas id="canvas-basic"></canvas>
      <div className="teabagPicture">
        <img src={teabagData.profilePicture} alt="teabagPicture" />
      </div>
      <div className="teabagDatas">
        <div className="teabagInfos">
          <h1>{teabagData.name} | Club</h1>
          <p>{teabagData.bio}</p>
        </div>
        <div className="teabagStats">
          <div className="followersDatas">
            <span className="data followers">
              {teabagData.followers ? teabagData.followers.length : 0}
            </span>
            <span>Followers</span>
          </div>
          <div className="followingsDatas">
            <span className="data">
              {teabagData.followeds ? teabagData.followeds.length : 0}
            </span>
            <span>Followings</span>
          </div>
          <div className="nftsDatas">
            <span className="data">
              {teabagData.listNfts ? teabagData.listNfts.length : 0}
            </span>
            <span>NFTs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
