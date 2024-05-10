import '../../scss/pages/teabag/teabagList.scss';
import { useEffect, useState } from 'react';
import { getAll } from '../../api/teabag';
import { TeabagInterface } from '../../interfaces/teabag';

export default function TeabagList() {
  const [teabags, setTeabags] = useState<TeabagInterface[] | null>(null);

  useEffect(() => {
    async function fetchTeabags() {
      const responseGetAllTeabags = await getAll();
      setTeabags(responseGetAllTeabags);
    }
    fetchTeabags();
  }, []);

  return (
    <section className="allTeabags">
      {teabags ? (
        teabags.map((teabag) => (
          <div key={teabag.id} className="teabag">
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
        ))
      ) : (
        <div className="loading">Loading...</div>
      )}
    </section>
  );
}
