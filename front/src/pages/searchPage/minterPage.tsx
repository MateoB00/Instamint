import { useEffect, useState, useRef } from 'react';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { getMinterByLink } from '../../api/user';
import CardProfile from '../../components/userProfile/cardProfile';
import { UserInterface } from '../../interfaces/userData';
import '../../scss/pages/searchPage/minterPage.scss';
import { NFT } from '../../interfaces/nftData';
import { getNFTsByUser } from '../../api/content';
import likeIcon from '../../assets/Icon/like_dislike/thumbs-up.png';
import dislikeIcon from '../../assets/Icon/like_dislike/thumbs-down.png';

// eslint-disable-next-line max-lines-per-function
export default function MinterPage() {
  const { link } = useParams();
  const [minter, setMinter] = useState<UserInterface | null>();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    getMinterByLink(link).then((res) => {
      res.user.profilePicture = `../public/${res.user.profilePicture}`;
      setMinter(res.user);
    });
  }, [link]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const formatedData = (liste: NFT[]) => {
        liste.forEach((element) => {
          const date = new Date(element.createdAt);
          element.createdAt = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        });
      };

      getNFTsByUser(link).then((res: NFT[]) => {
        formatedData(res);
        setNfts(res);
      });
    }
  }, [link, nfts]);

  return (
    <>
      <Header />
      <section className="userProfilePage">
        <div className="blocks">
          {minter && <CardProfile userData={minter} />}
          <div className="items">
            <div className="list-nfts-container">
              {nfts.map((nft) => (
                <li key={nft.id}>
                  <img src={nft.nftImageUrl} alt="NFT" />
                  <span>{nft.createdAt}</span>
                  <div className="like-dislike">
                    <div className="like-container">
                      <button>
                        <img src={likeIcon} alt="Like Icon" />
                      </button>
                      <span>{nft.likes}</span>
                    </div>
                    <div className="dislike-container">
                      <button>
                        <img src={dislikeIcon} alt="Dislike Icon" />
                      </button>
                      <span>{nft.dislikes}</span>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
