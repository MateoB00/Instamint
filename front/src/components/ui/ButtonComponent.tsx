import React from 'react';

interface ButtonComponentProps {
  onClick: () => void;
  children?: React.ReactNode;
  buttonType: 'viewCollection' | 'follow';
}

function ButtonComponent({ onClick, children, buttonType }: ButtonComponentProps) {
  return (
    <div className="button-container">
      <button className="button" onClick={onClick}>
        {children}
        {buttonType === 'viewCollection'}
        {buttonType === 'follow'}
      </button>
    </div>
  );
}

export default ButtonComponent;