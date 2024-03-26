import { MouseEventHandler, ReactNode } from 'react';

interface ButtonInterface {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const Button = ({ className, onClick, children }: ButtonInterface) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);

export default Button;
