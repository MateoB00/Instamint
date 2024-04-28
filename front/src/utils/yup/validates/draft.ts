import { catchErrors, shemaDraft } from '../shemas/yup';
import { createDraft, updateDraft } from '../../../api/nft';
import { NftInterface } from '../../../interfaces/nftData';
import { Dispatch, SetStateAction } from 'react';
import { FormApiMessages } from '../../../interfaces/formMessages';
import { ErrorsYup } from '../../../interfaces/yup';

const HTTP_OK_CREATED = 201;
const HTTP_OK = 200;
const BAD_REQUEST = 400;

const validateCreateOrUpdateDraft = (
  formDataDraft: NftInterface,
  create: boolean,
  setFormApiMessages: Dispatch<SetStateAction<FormApiMessages>>,
  setFormYupMessages: Dispatch<SetStateAction<ErrorsYup>>,
) => {
  shemaDraft
    .validate(formDataDraft, { abortEarly: false })
    .then(async () => {
      const response = create
        ? await createDraft(formDataDraft)
        : await updateDraft(formDataDraft);

      if (response.status === HTTP_OK || response.status === HTTP_OK_CREATED) {
        setFormApiMessages({
          apiSuccess: create
            ? 'Draft has been created'
            : 'Draft has been updated',
          apiError: '',
        });
      }
      if (response.status === BAD_REQUEST) {
        setFormApiMessages({
          apiError: create
            ? 'Draft has not been created'
            : 'Draft has not been updated',
          apiSuccess: '',
        });
      }
    })
    .catch((errors) => {
      setFormYupMessages(catchErrors(errors));
    });
};

export default validateCreateOrUpdateDraft;
