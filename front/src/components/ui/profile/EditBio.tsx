import React, { useState } from 'react';
import '../../../scss/components/ui/profile/EditBio.scss';

interface useEditBioProps {
  handleSaveClick: () => void;
  handleChange: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  bio: string;
}

const useEditBio: React.FC<useEditBioProps> = ({
  handleSaveClick,
  handleChange,
  bio,
}) => {
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="edit-bio">
      {editMode ? (
        <>
          <textarea
            value={bio}
            onChange={handleChange}
            placeholder="Edit your biography here..."
          />
          <button onClick={handleSaveClick} title="Save your bio">
            <img
              className="check-icon"
              src="../src/assets/Image/check.png"
              alt="Check"
            />
          </button>
          <button onClick={toggleEditMode} title="Cancel">
            <img
              className="cancel-icon"
              src="../src/assets/Image/close.png"
              alt="Cancel"
            />
          </button>
        </>
      ) : (
        <button
          className="edit-button"
          onClick={toggleEditMode}
          title="Modify your bio"
        >
          <img
            className="edit-icon"
            src="../src/assets/Image/edit.png"
            alt="Edit"
          />
        </button>
      )}
    </div>
  );
};
export default useEditBio;
