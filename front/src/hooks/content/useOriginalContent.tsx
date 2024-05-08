import { getAllOriginalContentsByUser } from '../../api/originalContent';
import { useState } from 'react';
import { OriginalContentInterface } from '../../interfaces/originalContent';

export const useOriginalContent = () => {
  const [originalContents, setOriginalContents] = useState<
    OriginalContentInterface[] | null
  >();

  const [selectedCard, setSelectedCard] =
    useState<OriginalContentInterface | null>();

  const fetchOriginalContents = async () => {
    const responseGetAllOriginalContents = await getAllOriginalContentsByUser();
    setOriginalContents(responseGetAllOriginalContents);
  };

  const handleShowCard = (originalContent: OriginalContentInterface) => {
    setSelectedCard(originalContent);
  };

  const handleCloseCard = () => {
    setSelectedCard(null);
  };

  return {
    fetchOriginalContents,
    originalContents,
    selectedCard,
    handleShowCard,
    handleCloseCard,
  };
};
