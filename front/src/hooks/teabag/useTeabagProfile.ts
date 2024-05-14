import { useState } from 'react';
import { TeabagInterface } from '../../interfaces/teabag';
import { getOneTeabag } from '../../api/teabag';
import { UserInterface } from '../../interfaces/userData';

type OptionsProfileType = 'Manage' | 'Members' | 'NFTs';

export const useTeabagProfile = () => {
  const [optionsProfiles, setOptionsProfiles] =
    useState<OptionsProfileType>('NFTs');

  const [asCook, setAsCook] = useState<boolean>(false);

  const [teabagData, setTeabagData] = useState<TeabagInterface | null>();

  const fetchTeabagData = async (link: string) => {
    const responseGetOneTeabag = await getOneTeabag(link);

    setTeabagData(responseGetOneTeabag);
  };

  const handleSetOptionsProfile = (profileType: OptionsProfileType) => {
    setOptionsProfiles(profileType);
  };

  const checkIfUserAsCook = (user: UserInterface, teabag: TeabagInterface) => {
    if (teabag.cooks.some((cook) => cook.id === user.id)) {
      setAsCook(true);
    }
  };

  return {
    teabagData,
    optionsProfiles,
    setOptionsProfiles,
    fetchTeabagData,
    handleSetOptionsProfile,
    asCook,
    checkIfUserAsCook,
  };
};
