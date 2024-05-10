import { create, update } from '../../api/teabag';

interface ValuesCreate {
  name: string;
  bio: string;
  link: string;
  whitelist: boolean;
  whitelistStartDate?: Date | null;
}

interface ValuesUpdate {
  name: string;
  bio: string;
  link: string;
}

interface SetStatusProps {
  setStatus: (_status: string | object | unknown) => void;
}

export const useTeabagForm = () => {
  const handleSubmitCreate = async (
    values: ValuesCreate,
    { setStatus }: SetStatusProps,
  ) => {
    values.whitelistStartDate = values.whitelist ? new Date() : null;

    const response = await create(values);

    if (response.status === 201) {
      return setStatus({
        message: 'Teabag has been created',
        success: response.ok,
        statusCode: response.status,
      });
    }

    return setStatus({
      message: 'failed',
      success: false,
      statusCode: response.status,
    });
  };

  const handleSubmitUpdate = async (
    values: ValuesUpdate,
    { setStatus }: SetStatusProps,
  ) => {
    const response = await update(values);

    if (response.status === 200) {
      return setStatus({
        message: 'Teabag has been updated',
        success: response.ok,
        statusCode: response.status,
      });
    }

    return setStatus({
      message: 'failed',
      success: false,
      statusCode: response.status,
    });
  };

  return {
    handleSubmitCreate,
    handleSubmitUpdate,
  };
};
