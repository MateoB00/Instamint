import '../../../../scss/components/ui/cards/cardContentModal.scss';
import { OriginalContentInterface } from '../../../../interfaces/originalContent';
import DraftForm from '../../forms/draftForm';
import MediaDisplay from './common/mediaDisplay';
import { useEffect, useState } from 'react';
import { ConfirmationModal } from '../../../modals/confirmation';
import { deleteOneOriginalContent } from '../../../../api/originalContent';
import TrashIcon from '../../../../assets/Icon/trash-icon.svg';

interface Props {
  originalContentData: OriginalContentInterface;
}

export default function OriginalContentCard({ originalContentData }: Props) {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [modalState, setModalState] = useState({ open: false, success: false });

  useEffect(() => {
    if (modalState.success === true) {
      deleteOneOriginalContent(originalContentData.path);
    }
  }, [originalContentData.path, modalState.success]);

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
      <img
        onClick={() => setModalState({ open: true, success: false })}
        src={TrashIcon}
        className="trashIcon"
        alt="trash_icon"
        width={20}
        height={20}
      />
      <ConfirmationModal
        isOpen={modalState.open}
        onClose={() => setModalState({ open: false, success: false })}
        isSuccess={() => setModalState({ open: false, success: true })}
      />
    </div>
  );
}
