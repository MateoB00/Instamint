import { useCallback, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { getMinterByLink } from '../../api/user';
import CardProfile from '../../components/userProfile/cardProfile';
import { UserInterface } from '../../interfaces/userData';
import '../../scss/pages/searchPage/minterPage.scss';
import { NFT } from '../../interfaces/nftData';
import {
  dislikeNFT,
  getLikesAndDislikes,
  getNFTsByUser,
  likeNFT,
} from '../../api/content';
import likeIcon from '../../assets/Icon/like_dislike/icons8-facebook-like-50.png';
import dislikeIcon from '../../assets/Icon/like_dislike/icons8-thumbs-down-32.png';

export default function MinterPage() {
  const { link } = useParams();
  const [minter, setMinter] = useState<UserInterface | null>();
  const [nfts, setNfts] = useState<NFT[]>([]);

  const updateLikesAndDislikes = async () => {
    const updatedNfts = await Promise.all(
      nfts.map(async (nft) => {
        const res = await getLikesAndDislikes(nft.id);

        return {
          ...nft,
          likes: res.likes,
          dislikes: res.dislikes,
        };
      }),
    );
    setNfts(updatedNfts);
  };

  const handleLike = (id: number) => {
    likeNFT(id).then(() => {
      updateLikesAndDislikes();
    });
  };

  const handleDislike = (id: number) => {
    dislikeNFT(id).then(() => {
      updateLikesAndDislikes();
    });
  };

  const formatedData = useCallback((liste: NFT[]) => {
    liste.forEach((element) => {
      const date = new Date(element.createdAt);
      element.createdAt = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      element.dislikes = 0;
      element.likes = 0;
    });

    return liste;
  }, []);

  useEffect(() => {
    getMinterByLink(link).then((res) => {
      res.user.profilePicture = `../public/${res.user.profilePicture}`;
      setMinter(res.user);
    });
    getNFTsByUser(link).then((res: NFT[]) => {
      const formattedRes = formatedData(res);
      setNfts(formattedRes);
    });
  }, [link, formatedData]);

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
                      <button onClick={() => handleLike(nft.id)}>
                        <img src={likeIcon} alt="Like Icon" />
                      </button>
                      <span>{nft.likes}</span>
                    </div>
                    <div className="dislike-container">
                      <button onClick={() => handleDislike(nft.id)}>
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
