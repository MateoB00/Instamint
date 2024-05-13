import { userUpdate } from '../../api/user';

interface SetStatusProps {
  setStatus: (_status: string | object | unknown) => void;
}

interface Values {
  username: string;
  uniqueLink: string;
  searchByEmailOrPhoneEnabled: boolean;
  twoFactorEnabled: boolean;
}

export const useUserUpdate = () => {
  const handleSubmit = async (
    values: Values,
    { setStatus }: SetStatusProps,
  ) => {
    try {
      const response = await userUpdate(values);

      setStatus({
        message: 'Update has success',
        success: true,
        statusCode: response.status,
      });
    } catch (error) {
      setStatus(error);
    }
  };

  return {
    handleSubmit,
  };
};
