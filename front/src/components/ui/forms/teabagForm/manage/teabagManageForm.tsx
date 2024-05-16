import { Formik } from 'formik';
import '../../../../../scss/components/ui/forms/teabag/teabagUpdate.scss';
import { schemaTeabagUpdate } from '../../../../../utils/yup/schemas';
import { TeabagInterface } from '../../../../../interfaces/teabag';
import TeabagUpdateFormContent from './teabagManageFormContent';
import { useTeabagForm } from '../../../../../hooks/teabag/useTeabagForm';

interface Props {
  teabagData: TeabagInterface | null | undefined;
}

const determineInitialValues = ({ teabagData }: Props) => ({
  id: teabagData?.id || '',
  name: teabagData?.name || '',
  link: teabagData?.link || '',
  bio: teabagData?.bio || '',
});

export default function TeabagManageForm({ teabagData }: Props) {
  const { handleSubmitUpdate } = useTeabagForm();
  const initialValues = determineInitialValues({ teabagData });

  return (
    <div className="manageTeabag">
      <Formik
        initialValues={initialValues}
        validationSchema={schemaTeabagUpdate}
        onSubmit={handleSubmitUpdate}
      >
        {({ status }) => <TeabagUpdateFormContent {...status} />}
      </Formik>
    </div>
  );
}
