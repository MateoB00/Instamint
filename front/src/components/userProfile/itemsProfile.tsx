import '../../scss/components/userProfile/itemsProfile/itemsProfile.scss';
import '../../scss/components/userProfile/itemsProfile/itemsProfileResponsive.scss';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { t } from 'i18next';

export default function ItemsProfile() {
  return (
    <>
      <div className="items">
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
              <Input name="min" value={'Min'} type="text" placeholder="Min" />
              <Input name="max" value={'Max'} type="text" placeholder="Max" />
            </div>
          </div>
        </div>
        <div className="nfts"></div>
      </div>
    </>
  );
}
