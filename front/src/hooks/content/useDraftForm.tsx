import { createDraft, updateDraft } from '../../api/nft';

interface Values {
  title: string;
  description: string;
  hashtags: string[];
  mediaUrl: string;
  location: string;
  pathFirebase: string;
  isDraft: boolean;
}

interface SetStatusProps {
  setStatus: (_status: string | object | unknown) => void;
}

export const useDraftForm = () => {
  const handleCreateDraft = async (
    values: Values,
    { setStatus }: SetStatusProps,
  ) => {
    try {
      const response = await createDraft(values);

      setStatus({
        message: 'Draft has been created',
        success: response.ok,
        statusCode: response.status,
      });
    } catch (error) {
      setStatus(error);
    }
  };

  const handleUpdateDraft = async (
    values: Values,
    { setStatus }: SetStatusProps,
  ) => {
    try {
      const response = await updateDraft(values);

      setStatus({
        message: 'Draft has been updated',
        success: response.ok,
        statusCode: response.status,
      });
    } catch (error) {
      setStatus(error);
    }
  };

  return {
    handleCreateDraft,
    handleUpdateDraft,
  };
};
