import { Message } from '../Message';
import Button from '../Button';
import Input from '../Input';
import { useItemsProfile } from '../../../hooks/components/userProfile/useItemsProfile';
import { useTranslation } from 'react-i18next';

export default function SideBar() {
  const { message, handleFileChange, handleUploadFile } = useItemsProfile();
  const { t } = useTranslation();

  return (
    <div className="sideBar">
      <div className="status">
        <span>{t('userProfile.status')}</span>
        <div className="choice">
          <Button>{t('userProfile.button.all')}</Button>
          <Button>{t('userProfile.button.new')}</Button>
          <Button>{t('userProfile.button.mostLikes')}</Button>
        </div>
      </div>
      <div className="price">
        <span>{t('userProfile.price')}</span>
        <div className="choice">
          <Input name="min" type="text" placeholder="Min" />
          <Input name="max" type="text" placeholder="Max" />
        </div>
      </div>
      <div>
        <span>{t('userProfile.uploadContent')}</span>
        <Input type="file" onChange={handleFileChange} />
        <Button onClick={handleUploadFile}>{t('button.upload')}</Button>
        <div>{message && <Message color="red" message={message} />}</div>
      </div>
    </div>
  );
}
