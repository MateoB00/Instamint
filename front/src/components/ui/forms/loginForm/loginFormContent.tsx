import { Form, useField } from 'formik';
import FormField from '../../FormField';
import Button from '../../Button';
import { Message } from '../../Message';
import { resendEmailConfirmation } from '../../../../api/auth';

const RenderButtons = (status: { message: string }) => {
  const [field] = useField('email');

  const resendEmailConfirmationHandler = () => {
    resendEmailConfirmation(field.value);
  };

  return (
    <div className="buttonsForm">
      <Button className="nextButton" type="submit">
        Connection
      </Button>
      {status.message === 'Email not verified' && (
        <Button
          children={'Send another email'}
          onClick={resendEmailConfirmationHandler}
          type="button"
        />
      )}
      <Button className="forgotPasswordButton" type="button">
        Forgot password ?
      </Button>
    </div>
  );
};

const fieldsForm = [
  {
    name: 'email',
    type: 'email',
    label: 'E-mail',
    placeholder: 'Enter your e-mail',
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
