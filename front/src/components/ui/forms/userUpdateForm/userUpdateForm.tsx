import { Formik } from 'formik';
import '../../../../scss/components/ui/authForms/authForms.scss';
import { schemaUpdateUser } from '../../../../utils/yup/schemas';
import UserUpdateFormContent from './userUpdateFormContent';
import { useUserUpdate } from '../../../../hooks/user/useUserUpdate';
import { UserInterface } from '../../../../interfaces/userData';

interface Props {
  userData: UserInterface | null | undefined;
}

const determineInitialValues = ({ userData }: Props) => ({
  username: userData?.username || '',
  uniqueLink: userData?.uniqueLink || '',
  searchByEmailOrPhoneEnabled: userData?.searchByEmailOrPhoneEnabled || false,
  twoFactorEnabled: userData?.twoFactorEnabled || false,
});

export default function UserUpdateform({ userData }: Props) {
  const { handleSubmit } = useUserUpdate();
  const initialValues = determineInitialValues({ userData });

  return (
    <div className="updateProfile">
      <Formik
        initialValues={initialValues}
        validationSchema={schemaUpdateUser}
        onSubmit={handleSubmit}
      >
        {({ status }) => (
          <UserUpdateFormContent {...status} userData={userData} />
        )}
      </Formik>
    </div>
  );
}
