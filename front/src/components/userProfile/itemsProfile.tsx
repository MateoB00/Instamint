import '../../scss/components/userProfile/itemsProfile/itemsProfile.scss';
import '../../scss/components/userProfile/itemsProfile/itemsProfileResponsive.scss';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function ItemsProfile() {
  return (
    <>
      <div className="items">
        <div className="sideBar">
          <div className="status">
            <span>Status</span>
            <div className="choice">
              <Button>All</Button>
              <Button>New</Button>
              <Button>Most likes</Button>
            </div>
          </div>
          <div className="price">
            <span>Price</span>
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
