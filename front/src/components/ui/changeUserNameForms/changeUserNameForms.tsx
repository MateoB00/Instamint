import { useState } from 'react';
import Input from '../../../components/ui/Input';
import { authChangeUsername } from '../../../api/authChangeUsername';
import { shemaChangeUsername, catchErrors } from '../../../utils/yup';

export default function AuthChangeUsername() {
  const [username, setUsername] = useState('');
  const [formErrors, setFormErrors] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors('');

    shemaChangeUsername
      .validate({ username }, { abortEarly: false })
      .then(async () => {
        const response = await authChangeUsername(username);

        if (response.success) {
          // eslint-disable-next-line no-alert
          alert('Username successfully changed');
        } else {
          setFormErrors(response.message);
        }
      })
      .catch((errors) => {
        const formattedErrors = catchErrors(errors);
        setFormErrors(formattedErrors.username);
      });
  };

  return (
    <div className="authForm">
      <form onSubmit={handleSubmit}>
        <h2>Change Username</h2>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="New Username"
        />
        {formErrors && <span style={{ color: 'red' }}>{formErrors}</span>}
        <button type="submit">Change Username</button>
      </form>
    </div>
  );
}
