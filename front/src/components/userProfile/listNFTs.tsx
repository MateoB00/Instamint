import { useEffect, useState } from 'react';
import { NFT } from '../../interfaces/nftData';
import { getMyNFTS } from '../../api/content';
import '../../scss/components/userProfile/listNFTs/listNFTs.scss';
import likeIcon from '../../assets/Icon/like_dislike/thumbs-up.png';
import dislikeIcon from '../../assets/Icon/like_dislike/thumbs-down.png';

const ListNFTs = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const formatedDate = (liste: NFT[]) => {
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

  useEffect(() => {
    getMyNFTS().then((res: NFT[]) => {
      formatedDate(res);
      setNfts(res);
    });
  });

  return (
    <div className="list-nfts-container">
      <h2>List Of My NFTs</h2>
      <ul>
        {nfts.map((nft) => (
          <li key={nft.id}>
            <img src={nft.nftImageUrl} alt="NFT" />
            <div>{nft.createdAt}</div>
            <div className="like-dislike">
              <div className="like-container">
                <img src={likeIcon} alt="Like Icon" />
                <span>{nft.likes}</span>
              </div>
              <div className="dislike-container">
                <img src={dislikeIcon} alt="Dislike Icon" />
                <span>{nft.dislikes}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListNFTs;
