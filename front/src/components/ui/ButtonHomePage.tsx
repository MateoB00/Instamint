import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
interface ButtonHomePageProps {
  onClick: () => void;
}

function ButtonHomePage({ onClick }: ButtonHomePageProps) {
  const { t } = useTranslation();

  return (
    <div className="button-container">
      <Link to="/auth">
        <button className="button" onClick={onClick}>
          {t('button.login')}
        </button>
      </Link>
    </div>
  );
}

export default ButtonHomePage;
