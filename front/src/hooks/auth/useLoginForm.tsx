import { authLogin } from '../../api/auth';

interface Values {
  email: string;
  password: string;
}

interface SetStatusProps {
  setStatus: (_status: string | object | unknown) => void;
}

export const useLoginForm = () => {
  const handleSubmit = async (
    values: Values,
    { setStatus }: SetStatusProps,
  ) => {
    try {
      const response = await authLogin(values);
      setStatus(response);
    } catch (error) {
      setStatus(error);
    }
  };

  return {
    handleSubmit,
  };
};
