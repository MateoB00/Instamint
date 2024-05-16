import { Formik } from 'formik';
import '../../../../scss/components/ui/authForms/authForms.scss';
import logo from '../../../../assets/Image/logo-instamint.svg';
import { schemaLogin } from '../../../../utils/yup/schemas';
import LoginFormContent from './loginFormContent';
import { useLoginForm } from '../../../../hooks/auth/useLoginForm';

export default function LoginForm() {
  const { handleSubmit } = useLoginForm();

  return (
    <div className="authForm">
      <div className="titleForm">
        <h2>Log in</h2>
      </div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schemaLogin}
        onSubmit={handleSubmit}
      >
        {({ status }) => <LoginFormContent {...status} />}
      </Formik>
      <p>
        Don't have an account ? <span>Sign up</span>
      </p>
      <img src={logo} alt="logo" />
    </div>
  );
}
