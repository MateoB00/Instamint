import { useState } from 'react';
import { TeabagInterface } from '../../interfaces/teabag';
import { getOneTeabag } from '../../api/teabag';

type OptionsProfileType = 'Manage' | 'Members' | 'NFTs';

export const useTeabagProfile = () => {
  const [optionsProfiles, setOptionsProfiles] =
    useState<OptionsProfileType>('NFTs');

  const [teabagData, setTeabagData] = useState<TeabagInterface | null>();

  const fetchTeabagData = async (link: string) => {
    const responseGetOneTeabag = await getOneTeabag(link);

    setTeabagData(responseGetOneTeabag);
  };

  const handleSetOptionsProfile = (profileType: OptionsProfileType) => {
    setOptionsProfiles(profileType);
  };

  return {
    teabagData,
    optionsProfiles,
    setOptionsProfiles,
    fetchTeabagData,
    handleSetOptionsProfile,
  };
};
