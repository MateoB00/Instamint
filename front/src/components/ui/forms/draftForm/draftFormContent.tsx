import { Form, FormikErrors } from 'formik';
import FormField from '../../FormField';
import { Message } from '../../Message';
import HashtagManager from '../../../manager/hashtag';
import { useEffect, useState } from 'react';
import Button from '../../Button';
import SelectCountry from '../../SelectCountry';

const colorAccent4 = '#b3ff80';

const fieldsForm = [
  {
    name: 'title',
    type: 'text',
    label: 'Title',
    placeholder: 'Enter a title',
    autoComplete: 'title',
  },
  {
    name: 'description',
    type: 'text',
    label: 'Description',
    placeholder: 'Enter a description',
    autoComplete: 'description',
  },
];

const RenderButtons = () => (
  <div className="buttons">
    <Button className="saveButton" children="Save" type="submit" />
    <Button className="mintButton" children="Mint" type="submit" />
  </div>
);

interface Props {
  message: string;
  success: boolean;
  setFieldValue: (
    _field: string,
    _value: string[] | string | number,
    _shouldValidate?: boolean | undefined,
  ) => Promise<void | FormikErrors<{
    title: string;
    description: string;
    hashtags: string[];
    mediaUrl: string;
    location: string;
    pathFirebase: string;
    isDraft: boolean;
  }>>;
  initialHashtags: string[];
  initialLocation: string;
}

const DraftFormContent = ({
  message,
  success,
  setFieldValue,
  initialHashtags,
  initialLocation,
}: Props) => {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [location, setLocation] = useState<string>('');
  useEffect(() => {
    if (initialHashtags.length > 0) {
      setHashtags(initialHashtags);
    }
  }, [initialHashtags]);

  useEffect(() => {
    if (initialLocation) {
      setLocation(initialLocation);
    }

    setFieldValue('hashtags', hashtags);
    setFieldValue('location', location);
  }, [hashtags, setFieldValue, location, initialLocation]);

  return (
    <Form>
      {fieldsForm.map((field) => (
        <FormField
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          label={field.label}
          autoComplete={field.autoComplete}
          className={`inputForm`}
        />
      ))}
      <HashtagManager
        hashtags={hashtags}
        setHashtags={(updatedHashtags) => setHashtags(updatedHashtags)}
      />
      <SelectCountry setLocation={setLocation} selectedCountry={location} />

      {success && <Message message={message} color={colorAccent4} />}
      {!success && message && <Message message={message} color="red" />}
      <RenderButtons />
    </Form>
  );
};

export default DraftFormContent;
