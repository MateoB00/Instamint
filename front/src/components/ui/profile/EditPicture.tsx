import React from 'react';
import '../../../scss/components/ui/profile/EditPicture.scss';
interface useEditPictureProps {
  handleProfilePictureChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRestoreOriginal: () => void;
  handleSavePictureClick: () => void;
}
const useEditPicture: React.FC<useEditPictureProps> = ({
  handleProfilePictureChange,
  handleRestoreOriginal,
  handleSavePictureClick,
}) => (
  <div className="edit-picture">
    <div className="button-container">
      <label
        htmlFor="file-input"
        className="edit-img"
        title="Change the profile picture"
      >
        <img
          className="edit-icon"
          src="../src/assets/Image/edit.png"
          alt="Edit"
        />
        <input
          id="file-input"
          type="file"
          accept=".png, .jpg"
          style={{ display: 'none' }}
          onChange={handleProfilePictureChange}
        />
      </label>
      <button
        className="restore"
        onClick={handleRestoreOriginal}
        title="Restore Original"
      >
        <img
          className="cancel-icon"
          src="../src/assets/Image/close.png"
          alt="Cancel"
        />
      </button>
      <button className="save" onClick={handleSavePictureClick} title="Save">
        <img
          className="check-icon"
          src="../src/assets/Image/check.png"
          alt="Check"
        />
      </button>
    </div>
  </div>
);

export default useEditPicture;
