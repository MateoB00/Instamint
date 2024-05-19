import { Form } from 'formik';
import FormField from '../../FormField';
import Button from '../../Button';
import { Message } from '../../Message';
import { HTTP_SUCCESS } from '../../../../constants/statusCodes';

const colorAccent1 = '#16502d';

const fieldsForm = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Enter a name',
    autoComplete: 'name',
  },
  {
    name: 'bio',
    type: 'text',
    label: 'Bio',
    placeholder: 'Enter a bio',
    autoComplete: 'bio',
  },
  {
    name: 'link',
    type: 'text',
    label: 'Link',
    placeholder: 'Enter a link',
    autoComplete: 'link',
  },
  {
    name: 'whitelist',
    type: 'checkbox',
    label: 'Whitelist ?',
    placeholder: 'Choose',
    autoComplete: 'whitelist',
  },
];

const RenderButton = () => (
  <div className="buttonsForm">
    <Button className="nextButton" type="submit">
      Create
    </Button>
  </div>
);

const TeabagCreateFormContent = (status: {
  message: string;
  statusCode?: number;
}) => (
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
    {status.statusCode === HTTP_SUCCESS.CREATED ? (
      <Message message={status.message} color={colorAccent1} />
    ) : (
      status.message && <Message message={status.message} color="red" />
    )}
    <RenderButton />
  </Form>
);

export default TeabagCreateFormContent;
