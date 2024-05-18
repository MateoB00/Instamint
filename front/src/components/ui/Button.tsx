import { MouseEventHandler, ReactNode } from 'react';

interface ButtonInterface {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  type?: 'submit' | 'reset' | 'button';
}

const Button = ({ className, onClick, children, type }: ButtonInterface) => (
  <button className={className} onClick={onClick} type={type}>
    {children}
  </button>
);

export default Button;
