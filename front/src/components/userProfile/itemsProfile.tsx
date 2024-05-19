import '../../scss/components/userProfile/itemsProfile/itemsProfile.scss';
import '../../scss/components/userProfile/itemsProfile/itemsProfileResponsive.scss';
import SideBar from '../ui/userProfile/SideBar';
import Drafts from '../ui/cards/drafts';
import OriginalContents from '../ui/cards/originalContents';
import Nfts from '../ui/cards/nfts';

interface OptionsProfilesProps {
  optionsProfiles: 'NFTs' | 'Drafts' | 'Content';
}

export default function ItemsProfile({
  optionsProfiles,
}: OptionsProfilesProps) {
  return (
    <>
      <div className="items">
        <SideBar />
        {optionsProfiles === 'NFTs' && <Nfts />}
        {optionsProfiles === 'Drafts' && <Drafts />}
        {optionsProfiles === 'Content' && <OriginalContents />}
      </div>
    </>
  );
}
