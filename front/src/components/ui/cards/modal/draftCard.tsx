import '../../../../scss/components/ui/cards/cardContentModal.scss';
import { useState } from 'react';
import { NftInterface } from '../../../../interfaces/nftData';
import DraftForm from '../../forms/draftForm';
import MediaDisplay from './common/mediaDisplay';

interface Props {
  draftNftData: NftInterface;
}

export default function DraftCard({ draftNftData }: Props) {
  const [hashtags, setHashtags] = useState<string[]>([]);

  return (
    <div className="card">
      <MediaDisplay
        mediaUrl={draftNftData.mediaUrl}
        mediaName={draftNftData.pathFirebase}
      />
      <DraftForm
        hashtags={hashtags}
        setHashtags={setHashtags}
        draftNftData={draftNftData}
        originalContentData={null}
      />
    </div>
  );
}
