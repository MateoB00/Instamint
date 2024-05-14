import { TeabagInterface } from '../../interfaces/teabag';
import TeabagManageForm from '../ui/forms/teabagForm/manage/teabagManageForm';

interface Props {
  teabagData: TeabagInterface | null | undefined;
}

export default function ManageProfile({ teabagData }: Props) {
  return <TeabagManageForm teabagData={teabagData} />;
}
