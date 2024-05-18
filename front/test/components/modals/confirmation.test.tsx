import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationModal } from '../../../src/components/modals/confirmation';

describe('ConfirmationModal', () => {
  const mockOnClose = jest.fn();
  const mockIsSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call isSuccess when Confirm button is clicked', () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={mockOnClose}
        isSuccess={mockIsSuccess}
      />,
    );
    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);
    expect(mockIsSuccess).toHaveBeenCalled();
  });

  it('should call onClose when Cancel button is clicked', () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={mockOnClose}
        isSuccess={mockIsSuccess}
      />,
    );
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should not render the modal when isOpen is false', () => {
    render(
      <ConfirmationModal
        isOpen={false}
        onClose={mockOnClose}
        isSuccess={mockIsSuccess}
      />,
    );
    const modal = screen.queryByText('Are you sure?');
    expect(modal).toBeNull();
  });
});
