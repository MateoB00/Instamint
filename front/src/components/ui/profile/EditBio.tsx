import React from 'react';
import '../../../scss/components/ui/profile/EditBio.scss';
import { t } from 'i18next';

interface EditBioProps {
  isEditingBio: boolean;
  bio: string;
  editedBio: string;
  handleEditBio: () => void;
  handleCancelEditBio: () => void;
  handleBioChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSaveEditedBio: () => void;
}

const EditBio: React.FC<EditBioProps> = ({
  isEditingBio,
  bio,
  editedBio,
  handleEditBio,
  handleCancelEditBio,
  handleBioChange,
  handleSaveEditedBio,
}) => (
  <div className="edit-bio">
    <strong>{t('title.bio')}</strong>
    <div>
      {isEditingBio ? (
        <textarea value={editedBio} onChange={handleBioChange} />
      ) : (
        <p>{bio}</p>
      )}
      <div>
        {isEditingBio ? (
          <>
            <button className="button-confirm" onClick={handleSaveEditedBio}>
              {t('button.confirm')}
            </button>
            <button className="button-cancel" onClick={handleCancelEditBio}>
              {t('button.cancel')}
            </button>
          </>
        ) : (
          <button className="button-bio" onClick={handleEditBio}>
            <img
              className="edit-bio-icon"
              src="../src/assets/Image/edit.png"
              alt="Edit"
            />
          </button>
        )}
      </div>
    </div>
  </div>
);

export default EditBio;
