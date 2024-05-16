import countries from '../../utils/countries.json';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Select from './Select';

interface Props {
  setLocation: Dispatch<SetStateAction<string>>;
  selectedCountry: string;
}

const SelectCountry = ({ setLocation, selectedCountry }: Props) => {
  const countryOptions = countries.map((country) => ({
    value: country.name,
    name: country.name,
  }));

  const handleSetLocation = (event: ChangeEvent<HTMLSelectElement>) =>
    setLocation(event.target.value);

  return (
    <Select
      name="location"
      id="location"
      selectedValue={selectedCountry}
      onChange={handleSetLocation}
      options={countryOptions}
      defaultOption="Select a country"
    />
  );
};

export default SelectCountry;
