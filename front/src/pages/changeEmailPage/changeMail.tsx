import { useState } from 'react';
import ChangeEmailForm from '../../components/ui/changeEmailForms/changeEmailForm';

export default function AuthPage() {
  const [showChangeEmail, setShowChangeEmail] = useState(false);

  return (
    <section className="authPage">
      
      <button
        disabled={Boolean(showRegister ||  showConnexion || showChangeEmail)}
        onClick={() => setShowChangeEmail(true)}
      >
        Change Email
      </button>

      {showChangeEmail && (
        <div className="popUp">
          <button onClick={() => setShowChangeEmail(false)} className="cross">
            ✕
          </button>
          <ChangeEmailForm />
        </div>
      )}
    </section>
  );
}
