import '../../scss/components/modals/confirmation.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isSuccess: () => void;
}
export const ConfirmationModal = ({ isOpen, onClose, isSuccess }: Props) => {
  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    isSuccess();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-message">Are you sure?</div>
        <div className="modal-footer">
          <button
            onClick={handleConfirm}
            className="modal-button close success"
          >
            Confirm
          </button>
          <button onClick={handleCancel} className="modal-button close error">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
