import ButtonComponent from './ui/ButtonComponent.tsx';
import { useTranslation } from 'react-i18next';
interface Item {
  name: string;
  details: string;
}

interface ComponentHomePageProps {
  title: string;
  subtitle: string;
  items: Item[];
}

function ComponentHomePage({ title, subtitle, items }: ComponentHomePageProps) {
  const { t } = useTranslation();
  const handleButtonClick = (itemName: string) => {
    // eslint-disable-next-line no-console
    console.log(`Button clicked for ${itemName}`);
  };

  return (
    <div className="componenthomepage">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div className="componenthomepage-container">
        {items.map((item, index) => (
          <div className="componenthomepage-item" key={index}>
            <div className="componenthomepage-box"></div>
            <h3>{item.name}</h3>
            <p>{item.details}</p>
            {title === t('featured.collections') && (
              <ButtonComponent
                onClick={() => handleButtonClick(item.name)}
                buttonType="viewCollection"
              >
                {t('button.viewCollection')}
              </ButtonComponent>
            )}
            {title === t('popular.creators') && (
              <ButtonComponent
                onClick={() => handleButtonClick(item.name)}
                buttonType="follow"
              >
                {t('button.follow')}
              </ButtonComponent>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComponentHomePage;
