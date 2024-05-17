import { Form } from 'formik';
import FormField from '../../../FormField';
import Button from '../../../Button';
import { Message } from '../../../Message';
import { Fragment } from 'react';
import { TeabagInterface } from '../../../../../interfaces/teabag';

const RenderButtons = () => <Button type="submit">Send</Button>;

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
];

interface Props {
  message: string;
  teabagData: TeabagInterface | null;
}

const TeabagManageFormContent = ({ message }: Props) => (
  <Form>
    <div className="informations">
      <h1>Informations</h1>
      {fieldsForm.map((field) => (
        <Fragment key={field.name}>
          <FormField
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            label={field.label}
            autoComplete={field.autoComplete}
            className={`inputForm`}
          />
        </Fragment>
      ))}
      {message && <Message message={message} color="red" />}
      <RenderButtons />
    </div>
  </Form>
);

export default TeabagManageFormContent;
