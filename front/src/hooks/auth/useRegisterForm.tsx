import { authRegister } from '../../api/auth';

const HTTP_OK = 201;

interface Values {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface SetStatusProps {
  setStatus: (_status: string | object | unknown) => void;
}

export const useRegisterForm = () => {
  const handleSubmit = async (
    values: Values,
    { setStatus }: SetStatusProps,
  ) => {
    try {
      const response = await authRegister(values);
      setStatus(response);
      if (response.status === HTTP_OK) {
        setStatus({
          message: 'User has been created, a confirmation mail was send',
          success: true,
          statusCode: response.status,
        });
      }
    } catch (error) {
      setStatus(error);
    }
  };

  return {
    handleSubmit,
  };
};
