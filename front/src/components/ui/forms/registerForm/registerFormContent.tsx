import { Form } from 'formik';
import FormField from '../../FormField';
import Button from '../../Button';
import { Message } from '../../Message';
import { HTTP_SUCCESS } from '../../../../constants/statusCodes';

const colorAccent1 = '#16502d';

const fieldsForm = [
  {
    name: 'email',
    type: 'email',
    label: 'E-mail',
    placeholder: 'Enter your e-mail',
    autoComplete: 'email',
  },
  {
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'Enter your username',
    autoComplete: 'username',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    autoComplete: 'password',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Enter your confirm password',
    autoComplete: 'confirmPassword',
  },
];

const RenderButton = () => (
  <div className="buttonsForm">
    <Button className="nextButton" type="submit">
      Next
    </Button>
  </div>
);

const RegisterFormContent = (status: {
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

export default RegisterFormContent;
