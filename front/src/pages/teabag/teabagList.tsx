import '../../scss/pages/teabag/teabagList.scss';
import { useEffect, useState } from 'react';
import { getAll } from '../../api/teabag';
import { TeabagInterface } from '../../interfaces/teabag';
import { UserInterface } from '../../interfaces/userData';

interface TeabagProps {
  teabag: TeabagInterface;
}

const AllTeabags = ({ teabag }: TeabagProps) => (
  <div key={teabag.id} className="teabag">
    <div className="informations">
      <span className="teabagName">Name : {teabag.name}</span>
      <span className="teabagBio">
        Bio :{teabag.bio.slice(0, 20)}
        {teabag.bio.length > 20 ? '...' : ''}
      </span>
      <span className="teabagWhitelist">
        Whitelist :{teabag.whitelistStartDate ? 'Yes' : 'No'}
      </span>
      <a href={`/teabag/${teabag.link}`}>Teabag Profile</a>
    </div>
  </div>
);

interface Props {
  userData: UserInterface | null | undefined;
}

export default function TeabagList({ userData }: Props) {
  const [teabags, setTeabags] = useState<TeabagInterface[] | null>(null);
  const [teabagsByUser, setTeabagsByUser] = useState<TeabagInterface[] | null>(
    null,
  );

  useEffect(() => {
    async function fetchTeabags() {
      const responseGetAllTeabags = await getAll();
      setTeabags(responseGetAllTeabags);
    }
    fetchTeabags();
  }, []);

  useEffect(() => {
    const filteredTeabags = teabags?.filter((teabag) =>
      teabag.cooks.some((cook) => cook.id === userData?.id),
    );
    if (filteredTeabags) {
      setTeabagsByUser(filteredTeabags);
    }
  }, [teabags, userData]);

  return (
    <section className="allTeabags">
      <h1>My teabags</h1>
      {teabagsByUser ? (
        teabagsByUser.map((teabagByUser) => (
          <div key={teabagByUser.id} className="myTeabag">
            <div className="informations">
              <span className="teabagName">Name : {teabagByUser.name}</span>
              <a href={`/teabag/${teabagByUser.link}`}>Teabag Profile</a>
            </div>
          </div>
        ))
      ) : (
        <div className="empty">No teabags.</div>
      )}
      <h1>All Teabags</h1>
      {teabags ? (
        teabags.map((teabag) => <AllTeabags teabag={teabag} />)
      ) : (
        <div className="empty">No teabags.</div>
      )}
    </section>
  );
}
