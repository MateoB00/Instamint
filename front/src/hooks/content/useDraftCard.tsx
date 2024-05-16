import { getAllDraftsByUser } from '../../api/nft';
import { useState } from 'react';
import { NftInterface } from '../../interfaces/nftData';
import { HTTP_ERRORS } from '../../constants/statusCodes';

export const useDraftCard = () => {
  const [drafts, setDrafts] = useState<NftInterface[] | null>();

  const [selectedCard, setSelectedCard] = useState<NftInterface | null>();

  const fetchDraftsByUser = async () => {
    const responseGetAllDrafts = await getAllDraftsByUser();
    if (responseGetAllDrafts === HTTP_ERRORS.UNAUTHORIZED) {
      setDrafts(null);
    } else {
      setDrafts(responseGetAllDrafts);
    }
  };

  const handleShowCard = (originalContent: NftInterface) => {
    setSelectedCard(originalContent);
  };

  const handleCloseCard = () => {
    setSelectedCard(null);
  };

  return {
    fetchDraftsByUser,
    drafts,
    selectedCard,
    handleShowCard,
    handleCloseCard,
  };
};
