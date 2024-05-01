import { ChangeEventHandler } from 'react';
import Select from './Select';

interface Country {
  name: string;
}

interface Props {
  countries: Country[];
  selectedCountry: string;
  onCountryChange: ChangeEventHandler;
}

const SelectCountry = ({
  countries,
  selectedCountry,
  onCountryChange,
}: Props) => {
  const countryOptions = countries.map((country) => ({
    value: country.name,
    name: country.name,
  }));

  return (
    <Select
      name="location"
      id="location"
      options={countryOptions}
      selectedValue={selectedCountry}
      onChange={onCountryChange}
      defaultOption="Select a country"
    />
  );
};

export default SelectCountry;
