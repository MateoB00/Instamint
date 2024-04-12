import '../../../scss/components/ui/resetPasswordForm/resetPasswordForms.scss';
import '../../../scss/components/ui/resetPasswordForm/resetPasswordResponsive.scss';
import Input from '../../../components/ui/Input';
import { useTwoFactorForm } from '../../../hooks/auth/useTwoFactorForm';

const fieldsForm = {
  name: 'code',
  type: 'text',
  label: 'Verification Code',
  placeholder: 'Enter your code',
};

export default function TwoFactorAuthForm() {
  const { formData, formMessages, handleChange, handleSubmit } =
    useTwoFactorForm();

  return (
    <div className="resetForm">
      <form onSubmit={handleSubmit} className="form">
        <Input
          type={fieldsForm.type}
          label={fieldsForm.label}
          name={fieldsForm.name}
          placeholder={fieldsForm.placeholder}
          value={formData[fieldsForm.name as keyof typeof formData]}
          onChange={handleChange}
        />
        {formMessages[fieldsForm.name as keyof typeof formMessages] && (
          <span style={{ color: 'red' }}>
            {formMessages[fieldsForm.name as keyof typeof formMessages]}
          </span>
        )}
        <div className="buttonsForm">
          <button>Verify</button>
          {formMessages.apiError && (
            <span style={{ color: 'red' }}>{formMessages.apiError}</span>
          )}
        </div>
      </form>
    </div>
  );
}
