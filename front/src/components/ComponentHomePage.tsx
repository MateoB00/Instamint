import React from 'react';
interface Item {
  name: string;
  details: string;
}

interface ComponentHomePageProps {
  title: string;
  subtitle: string;
  items: Item[];
}

const ComponentHomePage: React.FC<ComponentHomePageProps> = ({
  title,
  subtitle,
  items,
}: ComponentHomePageProps) => (
  <div className="componenthomepage">
    <h1>{title}</h1>
    <p>{subtitle}</p>
    <div className="componenthomepage-container">
      {items.map((item, index) => (
        <div className="componenthomepage-item" key={index}>
          <div className="componenthomepage-box">
            {/* Content of collection user & picture of creator user */}
          </div>
          <h3>{item.name}</h3>
          <p>{item.details}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ComponentHomePage;
