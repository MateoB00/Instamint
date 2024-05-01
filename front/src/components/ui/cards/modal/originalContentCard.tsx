import '../../../../scss/components/ui/cards/cardContentModal.scss';
import { OriginalContentInterface } from '../../../../interfaces/originalContent';
import DraftForm from '../../forms/draftForm';
import MediaDisplay from './common/mediaDisplay';
import { useState } from 'react';

interface Props {
  originalContentData: OriginalContentInterface;
}

export default function OriginalContentCard({ originalContentData }: Props) {
  const [hashtags, setHashtags] = useState<string[]>([]);

  return (
    <div className="card">
      <MediaDisplay
        mediaUrl={originalContentData.url}
        mediaName={originalContentData.name}
      />
      <DraftForm
        hashtags={hashtags}
        setHashtags={setHashtags}
        originalContentData={originalContentData}
        draftNftData={null}
      />
    </div>
  );
}
