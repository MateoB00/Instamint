import { ChangeEvent, useState } from 'react';
import validateCreateOrUpdateDraft from '../../utils/yup/validates/draft';
import { NftInterface } from '../../interfaces/nftData';
import { FormApiMessages } from '../../interfaces/formMessages';
import { ErrorsYup } from '../../interfaces/yup';
import useHandleChange from '../form/useHandleChange';
import { OriginalContentInterface } from '../../interfaces/originalContent';

const initializeFormDataDraft = (): NftInterface => ({
  title: '',
  description: '',
  hashtags: [],
  mediaUrl: '',
  location: '',
  pathFirebase: '',
  isDraft: true,
});

export const useDraftForm = () => {
  const [formDataDraft, setFormDataDraft] = useState<NftInterface>(
    initializeFormDataDraft(),
  );

  const [formYupMessages, setFormYupMessages] = useState<ErrorsYup>({});
  const [formApiMessages, setFormApiMessages] = useState<FormApiMessages>({
    apiError: '',
    apiSuccess: '',
  });

  const HandleChangeDraft = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    useHandleChange(e, setFormDataDraft, formDataDraft);
  };

  const handleCreateOrUpdateDraft = (
    create: boolean,
    hashtags: string[],
    originalContentData: OriginalContentInterface | null,
  ) => {
    if (originalContentData?.url) {
      formDataDraft.mediaUrl = originalContentData.url;
    }

    if (originalContentData?.path) {
      formDataDraft.pathFirebase = originalContentData.path;
    }

    if (hashtags) {
      formDataDraft.hashtags = hashtags;
    }

    validateCreateOrUpdateDraft(
      formDataDraft,
      create,
      setFormApiMessages,
      setFormYupMessages,
    );
  };

  return {
    handleCreateOrUpdateDraft,
    HandleChangeDraft,
    formDataDraft,
    setFormDataDraft,
    formYupMessages,
    formApiMessages,
  };
};
