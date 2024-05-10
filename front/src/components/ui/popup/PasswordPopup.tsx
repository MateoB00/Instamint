import { FormEvent, useState, } from 'react';
import '../../../scss/components/popup/PasswordPopup.scss'

const compareOldPassword = async (oldPassword: string): Promise<boolean> => {
    return true;
};
  
const hashNewPassword = async (newPassword: string): Promise<string> => {
    return 'hashedPassword';
};
  
const changePassword = async (hashedPassword: string): Promise<void> => {
    return;
};
export function PasswordPopup({ onClose }: { onClose: () => void }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password don't match");
      return;
    }

    const isOldPasswordCorrect = await compareOldPassword(oldPassword);
    if (!isOldPasswordCorrect) {
      alert('Incorrect old password');
      return;
    }

    const hashedPassword = await hashNewPassword(newPassword);

    await changePassword(hashedPassword);

    onClose();
  };

  return (
    <div className="passwordPopup">
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}