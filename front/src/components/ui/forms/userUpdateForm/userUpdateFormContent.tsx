import { Form } from 'formik';
import FormField from '../../FormField';
import Button from '../../Button';
import { Message } from '../../Message';
import { UserInterface } from '../../../../interfaces/userData';
import { Fragment } from 'react';
import QRCode from 'qrcode.react';

const RenderButtons = () => <Button type="submit">Send</Button>;

const fieldsForm = [
  {
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'Enter your username',
    autoComplete: 'username',
  },
  {
    name: 'uniqueLink',
    type: 'text',
    label: 'Unique Link',
    placeholder: 'Enter your unique link',
    autoComplete: 'uniqueLink',
  },
  {
    name: 'searchByEmailOrPhoneEnabled',
    type: 'checkbox',
    label: 'Search By Email Or Phone',
    placeholder: 'Enter your choice',
    autoComplete: 'searchByEmailOrPhoneEnabled',
  },
  {
    name: 'twoFactorEnabled',
    type: 'checkbox',
    label: 'Two Factor Authentication',
    placeholder: 'Enter your choice',
    autoComplete: 'twoFactor',
    qrCode: true,
  },
];

interface Props {
  message: string;
  userData: UserInterface | null;
}

const UserUpdateFormContent = ({ message, userData }: Props) => (
  <Form>
    <div className="personalInformations">
      <h1>Personal Informations</h1>
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
          {field.qrCode && userData?.otpPath && (
            <QRCode value={`${userData.otpPath}`} />
          )}
        </Fragment>
      ))}
      {message && <Message message={message} color="red" />}
      <RenderButtons />
    </div>
  </Form>
);

export default UserUpdateFormContent;
