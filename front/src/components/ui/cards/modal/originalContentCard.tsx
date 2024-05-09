import '../../../../scss/components/ui/cards/cardContentModal.scss';
import { OriginalContentInterface } from '../../../../interfaces/originalContent';
import DraftForm from '../../forms/draftForm/draftForm';
import MediaDisplay from './common/mediaDisplay';

interface Props {
  originalContentData: OriginalContentInterface;
}

export default function OriginalContentCard({ originalContentData }: Props) {
  return (
    <div className="card">
      <MediaDisplay
        mediaUrl={originalContentData.url}
        mediaName={originalContentData.name}
      />
      <DraftForm
        originalContentData={originalContentData}
        draftNftData={null}
      />
    </div>
  );
}
