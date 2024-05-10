import '../../scss/pages/teabagProfile/teabagProfile.scss';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTeabagProfile } from '../../hooks/teabag/useTeabagProfile';
import CardProfile from '../../components/teabagProfile/cardProfile';
import Button from '../../components/ui/Button';
import MembersProfile from '../../components/teabagProfile/membersProfile';

type OptionsProfileType = 'NFTs' | 'Members' | 'Manage';

const renderButtons = (
  handleSetOptionsProfile: (_profileType: OptionsProfileType) => void,
) => {
  const buttons = [
    { label: 'NFTs', option: 'NFTs' as OptionsProfileType },
    {
      label: 'Members',
      option: 'Members' as OptionsProfileType,
    },
    {
      label: 'Manage',
      option: 'Manage' as OptionsProfileType,
    },
  ];

  return buttons.map(({ label, option }) => (
    <Button key={option} onClick={() => handleSetOptionsProfile(option)}>
      {label}
    </Button>
  ));
};

export default function TeabagProfile() {
  const { link } = useParams();

  const {
    fetchTeabagData,
    teabagData,
    handleSetOptionsProfile,
    optionsProfiles,
  } = useTeabagProfile();

  useEffect(() => {
    if (link) {
      fetchTeabagData(link);
    }
  }, [fetchTeabagData, link]);

  return (
    <>
      <Header />
      <section className="teabagProfilePage">
        <div className="blocks">
          {teabagData && <CardProfile teabagData={teabagData} />}
          <div className="itemsChoice">
            <div className="navigation">
              {renderButtons(handleSetOptionsProfile)}
            </div>
            {optionsProfiles === 'NFTs'}
            {optionsProfiles === 'Manage'}
            {optionsProfiles === 'Members' && (
              <MembersProfile teabagData={teabagData} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
