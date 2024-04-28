import '../../../scss/components/ui/cards/cardContent.scss';
import WenIcon from '../../../assets/Icon/wen.svg';
import CardModal from './modal/card';
import { useEffect } from 'react';
import { useDraftCard } from '../../../hooks/content/useDraftCard';
import { NftInterface } from '../../../interfaces/nftData';
import LogoMusic from '../../../assets/Image/logo_music.png';
import LogoVideo from '../../../assets/Image/logo_video.png';

const getImageSrc = (draft: NftInterface) => {
  if (draft.pathFirebase.endsWith('.mp4')) {
    return LogoVideo;
  } else if (
    draft.pathFirebase.endsWith('.ogg') ||
    draft.pathFirebase.endsWith('.flac')
  ) {
    return LogoMusic;
  }

  return draft.mediaUrl;
};

export default function Drafts() {
  const {
    fetchDraftsByUser,
    drafts,
    selectedCard,
    handleShowCard,
    handleCloseCard,
  } = useDraftCard();

  useEffect(() => {
    fetchDraftsByUser();
  }, [fetchDraftsByUser]);

  return (
    <div className="drafts">
      {drafts &&
        drafts.map((draft) => (
          <div
            className="cardContent"
            key={draft.mediaUrl}
            onClick={() => handleShowCard(draft)}
          >
            <img src={getImageSrc(draft)} width="250" height="250" />
            <img className="wenIcon" src={WenIcon} width={20} height={20} />
          </div>
        ))}
      {selectedCard && (
        <CardModal
          nftDraftData={selectedCard}
          originalContentData={null}
          onClose={handleCloseCard}
        />
      )}
    </div>
  );
}
