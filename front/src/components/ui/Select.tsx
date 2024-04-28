import { ChangeEventHandler } from 'react';

interface Option {
  value: string;
  name: string;
}

interface Props {
  name: string;
  id: string;
  options: Option[];
  selectedValue: string;
  onChange: ChangeEventHandler;
  defaultOption: string;
}

const Select = ({
  name,
  id,
  options,
  selectedValue,
  onChange,
  defaultOption,
}: Props) => (
  <select name={name} id={id} value={selectedValue} onChange={onChange}>
    {defaultOption && <option value="">{defaultOption}</option>}
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.name}
      </option>
    ))}
  </select>
);

export default Select;
