import { getAllNftsByUser } from '../../api/nft';
import { useState } from 'react';
import { NftInterface } from '../../interfaces/nftData';

export const useNft = () => {
  const [nfts, setNfts] = useState<NftInterface[] | null>(null);

  const fetchNftsByUser = async () => {
    await getAllNftsByUser()
      .then((response) => {
        if (response !== void 0) {
          setNfts(response);
        } else {
          setNfts([]);
        }
      })
      .catch(() => {
        setNfts(null);
      });
  };

  return {
    fetchNftsByUser,
    nfts,
  };
};
