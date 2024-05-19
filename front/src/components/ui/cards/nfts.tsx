import '../../../scss/components/ui/cards/cardContent.scss';
import { useEffect } from 'react';
import { useNft } from '../../../hooks/content/useNft';

export default function Nfts() {
  const { fetchNftsByUser, nfts } = useNft();

  useEffect(() => {
    fetchNftsByUser();
  }, [fetchNftsByUser]);

  return (
    <div className="nfts">
      {nfts &&
        nfts.map((nft) => (
          <div className="cardContent" key={nft.mediaUrl}>
            <h2>{nft.title}</h2>
            <p>Description: {nft.description}</p>
            <p>Location: {nft.location}</p>
            <p>Hashtags: {nft.hashtags.join(', ')}</p>
            <img src={nft.mediaUrl} alt={nft.title} width="250" height="250" />
            <p>Path Firebase: {nft.pathFirebase}</p>
          </div>
        ))}
    </div>
  );
}
