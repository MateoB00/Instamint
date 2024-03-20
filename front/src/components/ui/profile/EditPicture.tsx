import React from 'react';
import '../../../scss/components/ui/profile/EditPicture.scss';

interface EditPictureProps {
  handleProfilePictureChange: (
    // eslint-disable-next-line no-unused-vars
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleRestoreOriginal: () => void;
  profilePicture: string;
}
const EditPicture: React.FC<EditPictureProps> = ({
  handleProfilePictureChange,
  handleRestoreOriginal,
  profilePicture,
}) => (
  <div className="edit-picture">
    <div className="profile-picture">
      <img src={profilePicture} alt="Profile" />
    </div>
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
    </div>
  </div>
);

export default EditPicture;
