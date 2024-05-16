import '../../scss/components/teabagProfile/membersProfile/membersProfile.scss';
import { useEffect, useState } from 'react';
import { UserInterface } from '../../interfaces/userData';
import { TeabagInterface } from '../../interfaces/teabag';

interface Props {
  teabagData: TeabagInterface | null | undefined;
}

export default function MembersProfile({ teabagData }: Props) {
  const [cooks, setCooks] = useState<UserInterface[] | null>(null);

  useEffect(() => {
    setCooks(teabagData?.cooks || []);
  }, [teabagData?.cooks]);

  return (
    <section className="allCooks">
      {cooks ? (
        cooks.map((cook) => (
          <div key={cook.id} className="cook">
            <span className="teabagName">Username : {cook.username}</span>
            <span className="teabagBio">
              Bio :{cook.bio.slice(0, 20)}
              {cook.bio.length > 20 ? '...' : ''}
            </span>
          </div>
        ))
      ) : (
        <div className="loading">Loading...</div>
      )}
    </section>
  );
}
