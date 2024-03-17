import { ChangeEventHandler, FC } from 'react';
import '../../scss/components/ui/input.scss';

interface InputProps {
  type: string;
  label: string;
  value: string | number;
  name: string;
  placeholder: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<InputProps> = ({
  type,
  label,
  value,
  name,
  placeholder,
  disabled,
  onChange,
}) => (
  <>
    <label htmlFor={label} className="labelForm">
      {label}
    </label>
    <input
      className="inputForm"
      type={type}
      id={label}
      value={value}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
    />
  </>
);

export default Input;