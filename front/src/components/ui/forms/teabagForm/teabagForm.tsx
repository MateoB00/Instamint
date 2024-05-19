import { Formik } from 'formik';
import '../../../../scss/components/ui/forms/teabag/teabagCreate.scss';
import logo from '../../../../assets/Image/logo-instamint.svg';
import { schemaTeabag } from '../../../../utils/yup/schemas';
import TeabagFormContent from './teabagFormContent';
import { useTeabagForm } from '../../../../hooks/teabag/useTeabagForm';

export default function TeabagCreateForm() {
  const { handleSubmitCreate } = useTeabagForm();

  return (
    <div className="teabagCreateForm">
      <div className="titleForm">
        <h2>Create you'r teabag</h2>
      </div>
      <Formik
        initialValues={{
          name: '',
          bio: '',
          link: '',
          whitelist: false,
        }}
        validationSchema={schemaTeabag}
        onSubmit={handleSubmitCreate}
      >
        {({ status }) => <TeabagFormContent {...status} />}
      </Formik>
      <img src={logo} alt="logo" />
    </div>
  );
}
