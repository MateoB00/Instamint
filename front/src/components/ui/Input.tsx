import { ChangeEventHandler, FC } from 'react';
import '../../scss/components/ui/input.scss';

interface InputProps {
  type: string;
  label?: string;
  value?: string | number;
  name?: string;
  placeholder?: string;
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
    <input
      className="input"
      type={type}
      id={label}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      {...(onChange ? { value } : { defaultValue: value })}
      readOnly={!onChange}
      onChange={onChange}
    />
  </>
);

export default Input;
