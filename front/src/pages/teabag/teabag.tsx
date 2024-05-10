import '../../scss/pages/teabag/teabag.scss';
import Header from '../../components/Header/Header';
import Button from '../../components/ui/Button';
import { useEffect, useState } from 'react';
import TeabagCreateForm from '../../components/ui/forms/teabagForm/teabagForm';
import { useUserProfile } from '../../hooks/user/useUserProfile';
import TeabagList from './teabagList';

export default function Teabag() {
  const [showFormCreateTeabag, setShowFormCreateTeabag] = useState(false);
  const { fetchUserData, userData } = useUserProfile();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData, userData]);

  const handleShowFormCreateTeabag = () =>
    setShowFormCreateTeabag((value) => !value);

  return (
    <>
      <Header />
      <section className="teabagPage">
        <div className="leftSide">
          <h1>Create your group and share your NFT with the world!</h1>
          <div className="button">
            {userData ? (
              <Button onClick={handleShowFormCreateTeabag}>Here !</Button>
            ) : (
              <Button>
                <a href="/auth">Connect</a>
              </Button>
            )}
          </div>
        </div>
        <div className="rightSide">
          <TeabagList />
        </div>
        {showFormCreateTeabag && (
          <div className="popUp">
            <button onClick={handleShowFormCreateTeabag} className="cross">
              ✕
            </button>
            <TeabagCreateForm />
          </div>
        )}
      </section>
    </>
  );
}
