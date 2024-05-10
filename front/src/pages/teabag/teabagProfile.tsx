import '../../scss/pages/teabagProfile/teabagProfile.scss';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTeabagProfile } from '../../hooks/teabag/useTeabagProfile';
import CardProfile from '../../components/teabagProfile/cardProfile';
import Button from '../../components/ui/Button';
import ManageProfile from '../../components/teabagProfile/manageProfile';
import { useUserProfile } from '../../hooks/user/useUserProfile';
import MembersProfile from '../../components/teabagProfile/membersProfile';

type OptionsProfileType = 'NFTs' | 'Members' | 'Manage';

const renderButtons = (
  handleSetOptionsProfile: (_profileType: OptionsProfileType) => void,
  asCook: boolean,
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
      condition: asCook,
    },
  ];

  return buttons.map(({ label, option, condition }) =>
    condition || option === 'Members' || option === 'NFTs' ? (
      <Button key={option} onClick={() => handleSetOptionsProfile(option)}>
        {label}
      </Button>
    ) : null,
  );
};

export default function TeabagProfile() {
  const { link } = useParams();
  const { fetchUserData, userData } = useUserProfile();

  const {
    fetchTeabagData,
    teabagData,
    handleSetOptionsProfile,
    optionsProfiles,
    checkIfUserAsCook,
    asCook,
  } = useTeabagProfile();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (userData && teabagData) {
      checkIfUserAsCook(userData, teabagData);
    }
  }, [checkIfUserAsCook, teabagData, userData, asCook]);

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
              {renderButtons(handleSetOptionsProfile, asCook)}
            </div>
            {optionsProfiles === 'Manage' && teabagData && asCook && (
              <ManageProfile teabagData={teabagData} />
            )}
            {optionsProfiles === 'NFTs'}
            {optionsProfiles === 'Members' && (
              <MembersProfile teabagData={teabagData} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
