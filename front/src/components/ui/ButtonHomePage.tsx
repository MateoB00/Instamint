import React from 'react';
interface ButtonHomePageProps {
  onClick: () => void;
}

const ButtonHomePage: React.FC<ButtonHomePageProps> = ({
  onClick,
}: ButtonHomePageProps) => (
  <div className="button-container">
    <button onClick={onClick}>Sign In</button>
  </div>
);

export default ButtonHomePage;
