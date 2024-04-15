import React, { useState, Fragment } from 'react';
import axios from 'axios';
import '../../../scss/components/ui/authForms/authForms.scss';
import '../../../scss/components/ui/authForms/authFormsResponsive.scss';
import Input from '../../../components/ui/Input';
import { shemaChangeUsername } from '../../../utils/yup';

const ChangeUsernameForm = () => {
  const [formData, setFormData] = useState({ username: '' });
  const [formErrors, setFormErrors] = useState({ username: '', apiError: '' });
  const [isSpecialCase, setIsSpecialCase] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '', apiError: '' });
    if (value.includes('special')) {
      setIsSpecialCase(true);
    } else {
      setIsSpecialCase(false);
    }
  };

  const handleSubmit = () => {
    setFormErrors({ username: '', apiError: '' });

    shemaChangeUsername
      .validate(formData, { abortEarly: false })
      .then(async () => {
        try {
          await axios.put('/change-username', {
            newUsername: formData.username,
          });
          setFormData({ username: '' });
        } catch (error) {
          setFormErrors({
            ...formErrors,
            apiError: 'An error occurred',
          });
        }
      })
      .catch((errors) => {
        setFormErrors(errors);
      });
  };

  return (
    <div className="authForm">
      <div className="titleForm">
        <h2>Change Username</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="New Username"
          name="username"
          placeholder="Enter your new username"
          value={formData.username}
          onChange={handleChange}
        />
        {formErrors.username && (
          <span style={{ color: 'red' }}>{formErrors.username}</span>
        )}
        <div className="buttonsForm">
          <button type="submit" className="nextButton">
            Change Username
          </button>
          {formErrors.apiError && (
            <span style={{ color: 'red' }}>{formErrors.apiError}</span>
          )}
          {isSpecialCase && (
            <Fragment>
              <button type="button" className="specialActionButton">
                Special Action
              </button>
            </Fragment>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChangeUsernameForm;
