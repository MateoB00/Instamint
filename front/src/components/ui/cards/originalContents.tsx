import '../../../scss/components/ui/cards/cardContent.scss';
import WenIcon from '../../../assets/Icon/wen.svg';
import CardModal from './modal/card';
import { useEffect } from 'react';
import { useOriginalContent } from '../../../hooks/content/useOriginalContent';
import LogoMusic from '../../../assets/Image/logo_music.png';
import LogoVideo from '../../../assets/Image/logo_video.png';
import { OriginalContentInterface } from '../../../interfaces/originalContent';

const getImageSrc = (fileName: OriginalContentInterface) => {
  if (fileName.name.endsWith('.mp4')) {
    return LogoVideo;
  } else if (
    fileName.name.endsWith('.ogg') ||
    fileName.name.endsWith('.flac')
  ) {
    return LogoMusic;
  }

  return fileName.url;
};

export default function OriginalContents() {
  const {
    fetchOriginalContents,
    originalContents,
    selectedCard,
    handleShowCard,
    handleCloseCard,
  } = useOriginalContent();

  useEffect(() => {
    fetchOriginalContents();
  }, [fetchOriginalContents]);

  return (
    <div className="originalContent">
      {originalContents &&
        originalContents.map((originalContent) => (
          <div
            className="cardContent"
            key={originalContent.url}
            onClick={() => handleShowCard(originalContent)}
          >
            <img src={getImageSrc(originalContent)} width="250" height="250" />

            <img className="wenIcon" src={WenIcon} width={20} height={20} />
          </div>
        ))}
      {selectedCard && (
        <CardModal
          originalContentData={selectedCard}
          nftDraftData={null}
          onClose={handleCloseCard}
        />
      )}
    </div>
  );
}
