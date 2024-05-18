import '../../../../scss/components/ui/cards/cardContentModal.scss';
import { NftInterface } from '../../../../interfaces/nftData';
import DraftForm from '../../forms/draftForm/draftForm';
import MediaDisplay from './common/mediaDisplay';

interface Props {
  draftNftData: NftInterface;
}

export default function DraftCard({ draftNftData }: Props) {
  return (
    <div className="card">
      <MediaDisplay
        mediaUrl={draftNftData.mediaUrl}
        mediaName={draftNftData.pathFirebase}
      />
      <DraftForm draftNftData={draftNftData} originalContentData={null} />
    </div>
  );
}
