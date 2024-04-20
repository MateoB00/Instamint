import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { getMinterByLink } from '../../api/user';
import CardProfile from '../../components/userProfile/cardProfile';
import { UserInterface } from '../../interfaces/userData';
import '../../scss/pages/searchPage/minterPage.scss';
import { NFT } from '../../interfaces/nftData';
import { getLikesAndDislikes, getNFTsByUser } from '../../api/content';

// eslint-disable-next-line max-lines-per-function
export default function MinterPage() {
  const { link } = useParams();
  const [minter, setMinter] = useState<UserInterface | null>();
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    getMinterByLink(link).then((res) => {
      res.user.profilePicture = `../public/${res.user.profilePicture}`;
      setMinter(res.user);
    });
  }, [link]);

  useEffect(() => {
    const updateLikesAndDislikes = () => {
      const updatedNfts: NFT[] = [];
      nfts.forEach((nft) => {
        getLikesAndDislikes(nft.id).then((res) => {
          updatedNfts.push({
            ...nft,
            likes: res.likes,
            dislikes: res.dislikes,
          });
          setNfts(updatedNfts);
        });
      });
    };

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
      updateLikesAndDislikes();
    };

    getNFTsByUser(link).then((res: NFT[]) => {
      formatedData(res);
      setNfts(res);
    });
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
                  <span>{nft.likes}</span>
                  <span>{nft.dislikes}</span>
                </li>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
