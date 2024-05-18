import { Formik } from 'formik';
import '../../../../scss/components/ui/authForms/authForms.scss';
import logo from '../../../../assets/Image/logo-instamint.svg';
import { schemaLogin } from '../../../../utils/yup/schemas';
import LoginFormContent from './loginFormContent';
import { useLoginForm } from '../../../../hooks/auth/useLoginForm';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
  const { handleSubmit } = useLoginForm();
  const { t } = useTranslation();

  return (
    <div className="authForm">
      <div className="titleForm">
        <h2>{t('button.login')}</h2>
      </div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schemaLogin}
        onSubmit={handleSubmit}
      >
        {({ status }) => <LoginFormContent {...status} />}
      </Formik>
      <p>
        {t('noAccount')} <span>{t('button.signup')}</span>
      </p>
      <img src={logo} alt="logo" />
    </div>
  );
}
