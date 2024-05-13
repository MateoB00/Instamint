import { ChangeEventHandler, FC } from 'react';
import '../../scss/components/ui/input.scss';

interface InputFormProps {
  type: string;
  label?: string;
  value: string | number | string[];
  name: string;
  placeholder: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  defaultChecked?: boolean | undefined;
}

const InputForm: FC<InputFormProps> = ({
  type,
  label,
  value,
  name,
  placeholder,
  disabled,
  onChange,
  defaultChecked,
}) => (
  <>
    {label && (
      <label htmlFor={label} className="labelForm">
        {label}
      </label>
    )}
    <input
      className="inputForm"
      type={type}
      id={label}
      value={value}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      defaultChecked={defaultChecked}
    />
  </>
);

export default InputForm;
