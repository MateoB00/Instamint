import { Formik } from 'formik';
import '../../../../scss/components/ui/authForms/authForms.scss';
import logo from '../../../../assets/Image/logo-instamint.svg';
import { schemaRegister } from '../../../../utils/yup/schemas';
import RegisterFormContent from './registerFormContent';
import { useRegisterForm } from '../../../../hooks/auth/useRegisterForm';
import { useTranslation } from 'react-i18next';

export default function RegisterForm() {
  const { handleSubmit } = useRegisterForm();
  const { t } = useTranslation();

  return (
    <div className="authForm">
      <div className="titleForm">
        <h2>{t('button.signup')}</h2>
      </div>
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={schemaRegister}
        onSubmit={handleSubmit}
      >
        {({ status }) => <RegisterFormContent {...status} />}
      </Formik>
      <p>
        {t('account')} <span>{t('button.login')}</span>
      </p>
      <img src={logo} alt="logo" />
    </div>
  );
}
