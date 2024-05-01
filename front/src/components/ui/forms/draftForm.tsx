import { Fragment } from 'react/jsx-runtime';
import { Message } from '../Message';
import HashtagManager from '../../manager/hashtag';
import Button from '../Button';
import InputForm from '../InputForm';
import SelectCountry from '../SelectCountry';
import countries from '../../../utils/countries.json';
import { useDraftForm } from '../../../hooks/content/useDraftForm';
import FormApiMessagesComponent from '../FormApiMessages';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
} from 'react';
import { OriginalContentInterface } from '../../../interfaces/originalContent';
import { NftInterface } from '../../../interfaces/nftData';
import { ErrorsYup } from '../../../interfaces/yup';

const FormButtons = () => (
  <div className="buttons">
    <Button className="saveButton" children="Save" />
    <Button className="mintButton" children="Mint" />
  </div>
);

interface PropsDraftFormFields {
  formDataDraft: NftInterface;
  formYupMessages: ErrorsYup;
  handleChangeDraft: (
    _e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => void;
}

const DraftFormFields = ({
  formDataDraft,
  formYupMessages,
  handleChangeDraft,
}: PropsDraftFormFields) => {
  const fieldsFormDraft = [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      placeholder: 'Enter a title',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      placeholder: 'Enter a description',
    },
  ];

  return (
    <>
      {fieldsFormDraft.map((field) => (
        <Fragment key={field.name}>
          <InputForm
            type={field.type}
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
            value={`${formDataDraft[field.name as keyof typeof formDataDraft]}`}
            onChange={handleChangeDraft}
          />
          {formYupMessages[field.name] && (
            <Message message={formYupMessages[field.name]} color="red" />
          )}
        </Fragment>
      ))}
    </>
  );
};

interface PropsDraftForm {
  hashtags: string[];
  setHashtags: Dispatch<SetStateAction<string[]>>;
  originalContentData: OriginalContentInterface | null;
  draftNftData: NftInterface | null;
}

const DraftForm = ({
  hashtags,
  setHashtags,
  originalContentData,
  draftNftData,
}: PropsDraftForm) => {
  const {
    formDataDraft,
    formApiMessages,
    formYupMessages,
    HandleChangeDraft,
    handleCreateOrUpdateDraft,
    setFormDataDraft,
  } = useDraftForm();

  useEffect(() => {
    if (draftNftData) {
      setFormDataDraft(draftNftData);
      setHashtags(draftNftData.hashtags);
    }
  }, [draftNftData, setFormDataDraft, setHashtags]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (originalContentData) {
      handleCreateOrUpdateDraft(true, hashtags, originalContentData);
    } else {
      handleCreateOrUpdateDraft(false, hashtags, null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DraftFormFields
        formDataDraft={formDataDraft}
        formYupMessages={formYupMessages}
        handleChangeDraft={HandleChangeDraft}
      />

      <HashtagManager
        hashtags={hashtags}
        setHashtags={(updatedHashtags) => setHashtags(updatedHashtags)}
      />

      <SelectCountry
        countries={countries}
        selectedCountry={formDataDraft.location}
        onCountryChange={HandleChangeDraft}
      />

      <FormButtons />
      <FormApiMessagesComponent messages={formApiMessages} />
    </form>
  );
};

export default DraftForm;
