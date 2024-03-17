import Input from '../../../components/ui/Input';
import { useChangeEmailForm } from '../../../hooks/chagneMail';

export default function AuthChangeEmail() {
  const { emailData, formErrors, handleChange, handleSubmit } =
    useChangeEmailForm();

  return (
    <div className="authForm">
      <form onSubmit={handleSubmit}>
        <h2>Change Email</h2>
        <Input
          type="email"
          name="email"
          value={emailData.email}
          onChange={handleChange}
          placeholder="Current Email"
        />
        <Input
          type="email"
          name="newEmail"
          value={emailData.newEmail}
          onChange={handleChange}
          placeholder="New Email"
        />
        {formErrors && <span style={{ color: 'red' }}>{formErrors}</span>}
        <button type="submit">Change Email</button>
      </form>
    </div>
  );
}
