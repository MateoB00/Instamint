import { getMe } from '../../api/user';
import { useState, useCallback } from 'react';
import { UserInterface } from '../../interfaces/userData';
import { HTTP_ERRORS } from '../../constants/statusCodes';

type OptionsProfileType =
  | 'NFTs'
  | 'Drafts'
  | 'Informations'
  | '2FA'
  | 'Delete Account'
  | 'Content'
  | 'Notifications';

export const useUserProfile = () => {
  const [optionsProfiles, setOptionsProfiles] =
    useState<OptionsProfileType>('NFTs');
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [userData, setUserData] = useState<UserInterface | null>();
  const fetchUserData = useCallback(async () => {
    const responseGetMe = await getMe();
    if (responseGetMe === HTTP_ERRORS.UNAUTHORIZED) {
      return setUserData(null);
    }

    return setUserData(responseGetMe);
  }, []);

  const handleSetOptionsProfile = (profileType: OptionsProfileType) => {
    setOptionsProfiles(profileType);
  };

  return {
    optionsProfiles,
    userData,
    fetchUserData,
    handleSetOptionsProfile,
    setOptionsProfiles,
    isDataFetched,
    setIsDataFetched,
  };
};
