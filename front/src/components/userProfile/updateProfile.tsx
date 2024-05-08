import '../../scss/components/userProfile/updateProfile/updateProfile.scss';
import { UserInterface } from '../../interfaces/userData';
import UserUpdateForm from '../ui/forms/userUpdateForm/userUpdateForm';

interface Props {
  userData: UserInterface | null | undefined;
}

export default function UpdateProfile({ userData }: Props) {
  return <UserUpdateForm userData={userData} />;
}
