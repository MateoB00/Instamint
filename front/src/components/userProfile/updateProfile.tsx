import { Fragment } from 'react';
import { useUserUpdate } from '../../hooks/user/useUserUpdate';
import '../../scss/components/userProfile/updateProfile/updateProfile.scss';
import '../../scss/components/userProfile/updateProfile/updateProfileResponsive.scss';
import InputForm from '../ui/InputForm';
import Button from '../ui/Button';
import { UserInterface } from '../../interfaces/userData';
import { Message, renderMessages } from '../ui/Message';
import QRCode from 'qrcode.react';

interface Props {
  userData: UserInterface | null | undefined;
}

const fieldsFormPersonalInformations = [
  {
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'Enter your username',
  },
  {
    name: 'uniqueLink',
    type: 'text',
    label: 'Unique Link',
    placeholder: 'Enter your unique link',
  },
  {
    name: 'searchByEmailOrPhoneEnabled',
    type: 'checkbox',
    label: 'Search By Email Or Phone',
    placeholder: 'Enter your e-mail',
  },
  {
    name: 'visibility',
    type: 'checkbox',
    label: 'Profile Visibility',
    placeholder: 'Set profile visibility',
  },
  {
    name: 'twoFactorEnabled',
    type: 'checkbox',
    label: 'Two Factor Authentication',
    placeholder: 'Enter your choice',
    qrCode: true,
  },
];

export default function UpdateProfile({ userData }: Props) {
  const {
    formData,
    formYupMessages,
    formApiMessages,
    handleChange,
    handleSubmit,
  } = useUserUpdate({ userData });

  return (
    <div className="updateProfile">
      <form onSubmit={handleSubmit}>
        <div className="personalInformations">
          <h1>Personal Informations</h1>
          {fieldsFormPersonalInformations.map((field) => (
            <Fragment key={field.name}>
              {userData && (
                <InputForm
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={`${formData[field.name as keyof typeof formData]}`}
                  defaultChecked={
                    field.name === 'searchByEmailOrPhoneEnabled'
                      ? userData.searchByEmailOrPhoneEnabled
                      : userData.twoFactorEnabled
                  }
                  onChange={handleChange}
                />
              )}
              {field.qrCode && <QRCode value={`${userData?.otpPath}`} />}
              {formYupMessages[field.name as keyof typeof formYupMessages] && (
                <Message
                  message={
                    formYupMessages[field.name as keyof typeof formYupMessages]
                  }
                  color={'red'}
                />
              )}
            </Fragment>
          ))}
          {formApiMessages.apiSuccess &&
            renderMessages(formApiMessages, '#16502d')}
          {formApiMessages.apiError && renderMessages(formApiMessages, 'red')}
          <Button children={'Send'} />
        </div>
      </form>
    </div>
  );
}
