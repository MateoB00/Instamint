/* eslint-disable max-lines-per-function */
import { Form } from 'formik';
import FormField from '../../FormField';
import Button from '../../Button';
import { Message } from '../../Message';
import { HTTP_SUCCESS } from '../../../../constants/statusCodes';
import { useTranslation } from 'react-i18next';

const colorAccent1 = '#16502d';

const RegisterFormContent = (status: {
  message: string;
  statusCode?: number;
}) => {
  const { t } = useTranslation();

  const fieldsForm = [
    {
      name: 'email',
      type: 'email',
      label: t('label.email'),
      placeholder: t('placeholder.email'),
      autoComplete: 'email',
    },
    {
      name: 'username',
      type: 'text',
      label: t('label.username'),
      placeholder: t('placeholder.username'),
      autoComplete: 'username',
    },
    {
      name: 'password',
      type: 'password',
      label: t('label.password'),
      placeholder: t('placeholder.password'),
      autoComplete: 'password',
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: t('label.confirm.password'),
      placeholder: t('placeholder.confirm.password'),
      autoComplete: 'confirmPassword',
    },
  ];

  const RenderButton = () => (
    <div className="buttonsForm">
      <Button className="nextButton" type="submit">
        {t('button.next')}
      </Button>
    </div>
  );

  return (
    <Form>
      {fieldsForm.map((field) => (
        <FormField
          key={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          label={field.label}
          autoComplete={field.autoComplete}
          className="inputForm"
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
};

export default RegisterFormContent;
