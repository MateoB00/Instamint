import { Formik } from 'formik';
import '../../../../scss/components/ui/authForms/authForms.scss';
import logo from '../../../../assets/Image/logo-instamint.svg';
import { schemaRegister } from '../../../../utils/yup/schemas';
import RegisterFormContent from './registerFormContent';
import { useRegisterForm } from '../../../../hooks/auth/useRegisterForm';

export default function RegisterForm() {
  const { handleSubmit } = useRegisterForm();

  return (
    <div className="authForm">
      <div className="titleForm">
        <h2>Register</h2>
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
        Don't have an account ? <span>Sign up</span>
      </p>
      <img src={logo} alt="logo" />
    </div>
  );
}
