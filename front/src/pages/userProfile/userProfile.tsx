import '../../scss/pages/userProfile/userProfile.scss';
import Header from '../../components/Header/Header';
import { useEffect } from 'react';
import ItemsProfile from '../../components/userProfile/itemsProfile';
import UpdateProfile from '../../components/userProfile/updateProfile';
import CardProfile from '../../components/userProfile/cardProfile';
import { useUserProfile } from '../../hooks/user/useUserProfile';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

type OptionsProfileType =
  | 'NFTs'
  | 'Drafts'
  | 'Informations'
  | '2FA'
  | 'Delete Account'
  | 'Content'
  | 'Notifications'
  | 'Comments';

const renderButtons = (
  handleSetOptionsProfile: (_profileType: OptionsProfileType) => void,
) => {
  const buttons = [
    { label: 'NFTs', option: 'NFTs' as OptionsProfileType },
    { label: 'Drafts', option: 'Drafts' as OptionsProfileType },
    { label: 'Content', option: 'Content' as OptionsProfileType },
    { label: 'Informations', option: 'Informations' as OptionsProfileType },
    { label: 'Notifications', option: 'Notifications' as OptionsProfileType },
    { label: 'Comments', option: 'Comments' as OptionsProfileType },
  ];

  return buttons.map(({ label, option }) => (
    <Button key={option} onClick={() => handleSetOptionsProfile(option)}>
      {label}
    </Button>
  ));
};

interface LocationState {
  state: {
    setOptionsProfiles:
      | 'NFTs'
      | 'Drafts'
      | 'Informations'
      | 'Content'
      | 'Notifications'
      | 'Comments';
  };
}

// eslint-disable-next-line max-lines-per-function
export default function UserProfile() {
  const location: LocationState = useLocation();
  const navigate = useNavigate();

  const {
    optionsProfiles,
    userData,
    fetchUserData,
    setOptionsProfiles,
    handleSetOptionsProfile,
  } = useUserProfile();

  useEffect(() => {
    fetchUserData();
    if (userData === null) {
      navigate('/auth');
    }
  }, [fetchUserData, userData, navigate]);

  useEffect(() => {
    const initialState = location.state;
    if (initialState && initialState.setOptionsProfiles) {
      setOptionsProfiles(initialState.setOptionsProfiles);
    }
  }, [location.state, setOptionsProfiles]);

  const handleSetOptionsProfileWithRedirect = (
    profileType: OptionsProfileType,
  ) => {
    if (profileType === 'Comments') {
      navigate(`/nft/${userData?.id}/comments`);
    } else {
      handleSetOptionsProfile(profileType);
    }
  };

  return (
    <>
      <Header />
      <section className="userProfilePage">
        <div className="blocks">
          {userData && <CardProfile userData={userData} />}
          <div className="itemsChoice">
            <div className="navigation">
              {renderButtons(handleSetOptionsProfileWithRedirect)}
            </div>
            {(optionsProfiles === 'NFTs' ||
              optionsProfiles === 'Drafts' ||
              optionsProfiles === 'Content') && (
              <ItemsProfile optionsProfiles={optionsProfiles} />
            )}
            {optionsProfiles === 'Informations' && (
              <UpdateProfile userData={userData} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
