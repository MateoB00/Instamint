import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { NftInterface } from '../../interfaces/nftData';

const useHandleChange = (
  e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  setFormData: Dispatch<SetStateAction<NftInterface>>,
  formData: NftInterface,
) => {
  const { name, value, type } = e.target;

  if (type === 'checkbox') {
    const input = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: input.checked });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

export default useHandleChange;
