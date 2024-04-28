import { ChangeEvent, FormEvent, useState } from 'react';
import { shemaUpdateUser, catchErrors } from '../../utils/yup/shemas/yup';
import { userUpdate } from '../../api/user';
import { UserInterface } from '../../interfaces/userData';
import { ErrorsYup } from '../../interfaces/yup';
import { FormApiMessages } from '../../interfaces/formMessages';

interface Props {
  userData: UserInterface | null | undefined;
}

export const useUserUpdate = ({ userData }: Props) => {
  const [formData, setFormData] = useState({
    username: userData && userData.username,
    uniqueLink: userData && userData.uniqueLink,
    searchByEmailOrPhoneEnabled:
      userData && userData.searchByEmailOrPhoneEnabled,
  });
  const [formYupMessages, setFormYupMessages] = useState<ErrorsYup>({});
  const [formApiMessages, setFormApiMessages] = useState<FormApiMessages>({
    apiError: '',
    apiSuccess: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    shemaUpdateUser
      .validate(formData, { abortEarly: false })
      .then(async () => {
        const response = await userUpdate(formData);

        if (response.success === true) {
          setFormApiMessages({
            apiSuccess: response.message,
            apiError: '',
          });
        }
        if (response.error) {
          setFormApiMessages({
            apiSuccess: '',
            apiError: response.message,
          });
        }
      })
      .catch((errors) => {
        setFormYupMessages(catchErrors(errors));
      });
  };

  return {
    formData,
    formYupMessages,
    formApiMessages,
    handleChange,
    handleSubmit,
  };
};
