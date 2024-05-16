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
            {nft.title}
            <img src="" width="250" height="250" />
          </div>
        ))}
    </div>
  );
}
