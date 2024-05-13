import { Form, useField } from 'formik';
import FormField from '../../FormField';
import Button from '../../Button';
import { Message } from '../../Message';
import { resendEmailConfirmation } from '../../../../api/auth';
import { useTranslation } from 'react-i18next';

const RenderButtons = (status: { message: string }) => {
  const [field] = useField('email');
  const { t } = useTranslation();

  const resendEmailConfirmationHandler = () => {
    resendEmailConfirmation(field.value);
  };

  return (
    <div className="buttonsForm">
      <Button className="nextButton" type="submit">
        {t('button.login')}
      </Button>
      {status.message === t('emailNotVerified') && (
        <Button
          children={t('sendEmailAgain')}
          onClick={resendEmailConfirmationHandler}
          type="button"
        />
      )}
      <Button className="forgotPasswordButton" type="button">
        {t('forgotPassword')}
      </Button>
    </div>
  );
};

const fieldsForm = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    autoComplete: 'email',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    autoComplete: 'password',
  },
];

const LoginFormContent = (status: { message: string }) => (
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
    {status && <Message message={status.message} color="red" />}
    <RenderButtons {...status} />
  </Form>
);

export default LoginFormContent;
