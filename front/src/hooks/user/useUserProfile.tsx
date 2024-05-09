import { getMe } from '../../api/user';
import { useState } from 'react';
import { UserInterface } from '../../interfaces/userData';

const HTTP_UNAUTHORIZED = 401;

type OptionsProfileType =
  | 'NFTs'
  | 'Drafts'
  | 'Informations'
  | '2FA'
  | 'Delete Account'
  | 'Content'
  | 'Comments';

export const useUserProfile = () => {
  const [optionsProfiles, setOptionsProfiles] =
    useState<OptionsProfileType>('NFTs');

  const [userData, setUserData] = useState<UserInterface | null>();

  const fetchUserData = async () => {
    const responseGetMe = await getMe();
    if (responseGetMe === HTTP_UNAUTHORIZED) {
      return setUserData(null);
    }

    return setUserData(responseGetMe);
  };

  const handleSetOptionsProfile = (profileType: OptionsProfileType) => {
    setOptionsProfiles(profileType);
  };

  return {
    optionsProfiles,
    userData,
    fetchUserData,
    handleSetOptionsProfile,
    setOptionsProfiles,
  };
};
