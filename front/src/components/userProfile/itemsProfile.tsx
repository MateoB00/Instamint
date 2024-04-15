import '../../scss/components/userProfile/itemsProfile/itemsProfile.scss';
import '../../scss/components/userProfile/itemsProfile/itemsProfileResponsive.scss';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Message } from '../ui/Message';
import { useItemsProfile } from '../../hooks/components/userProfile/useItemsProfile';
import { useEffect } from 'react';
import { getMyNFTS } from '../../api/content';

interface OptionsProfilesProps {
  optionsProfiles: 'NFTs' | 'Drafts';
}

export default function ItemsProfile({
  optionsProfiles,
}: OptionsProfilesProps) {
  const { message, handleFileChange, handleUpload } = useItemsProfile();

  useEffect(() => {
    getMyNFTS();
  }, []);

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
          <div>
            <span>Upload a content</span>
            <Input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload}>Upload</Button>
            <div>{message && <Message color="red" message={message} />}</div>
          </div>
        </div>
        {optionsProfiles === 'NFTs' && <div className="nfts"></div>}
        {optionsProfiles === 'Drafts' && <div className="drafts"></div>}
      </div>
    </>
  );
}
