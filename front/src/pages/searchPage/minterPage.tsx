import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { getMinterByLink } from '../../api/user';
import CardProfile from '../../components/userProfile/cardProfile';
import { UserInterface } from '../../interfaces/userData';
import '../../scss/pages/searchPage/minterPage.scss';

export default function MinterPage() {
  const { link } = useParams();
  const [minter, setMinter] = useState<UserInterface | null>();

  useEffect(() => {
    getMinterByLink(link).then((res) => {
      res.user.profilePicture = `../public/${res.user.profilePicture}`;
      setMinter(res.user);
    });
  }, [link]);

  return (
    <>
      <Header />
      <section className="userProfilePage">
        <div className="blocks">
          {minter && <CardProfile userData={minter} />}
          <div className="itemsChoice">
            <div className="navigation"></div>
          </div>
        </div>
      </section>
    </>
  );
}
