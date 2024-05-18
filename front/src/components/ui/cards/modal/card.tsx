import '../../../../scss/components/ui/cards/cardContentModal.scss';
import '../../../../scss/components/ui/cards/cardContentModalResponsive.scss';
import CloseIcon from '../../../../assets/Icon/close.svg';
import { OriginalContentInterface } from '../../../../interfaces/originalContent';
import { NftInterface } from '../../../../interfaces/nftData';
import OriginalContentCard from './originalContentCard';
import DraftCard from './draftCard';

interface Props {
  originalContentData: OriginalContentInterface | null;
  nftDraftData: NftInterface | null;
  onClose: () => void;
}

export default function CardModal({
  originalContentData,
  nftDraftData,
  onClose,
}: Props) {
  return (
    <div className="cardContentModal">
      <img
        className="closeIcon"
        src={CloseIcon}
        width={30}
        height={30}
        onClick={onClose}
      />
      {originalContentData && (
        <OriginalContentCard originalContentData={originalContentData} />
      )}
      {nftDraftData && <DraftCard draftNftData={nftDraftData} />}
    </div>
  );
}
