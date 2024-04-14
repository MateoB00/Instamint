import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ItemsProfile from '../../../src/components/userProfile/itemsProfile';

describe('ItemsProfile component', () => {
  test('renders Status buttons', () => {
    const optionsProfiles = 'NFTs';
    const { getByText } = render(
      <ItemsProfile optionsProfiles={optionsProfiles} />,
    );

    expect(getByText('Status')).toBeInTheDocument();
    expect(getByText('All')).toBeInTheDocument();
    expect(getByText('New')).toBeInTheDocument();
    expect(getByText('Most likes')).toBeInTheDocument();
  });

  test('renders Price inputs', () => {
    const optionsProfiles = 'NFTs';
    const { getByText, getByPlaceholderText } = render(
      <ItemsProfile optionsProfiles={optionsProfiles} />,
    );

    expect(getByText('Price')).toBeInTheDocument();
    expect(getByPlaceholderText('Min')).toBeInTheDocument();
    expect(getByPlaceholderText('Max')).toBeInTheDocument();
  });

  test('Price inputs are initially empty', () => {
    const optionsProfiles = 'NFTs';
    const { getByPlaceholderText } = render(
      <ItemsProfile optionsProfiles={optionsProfiles} />,
    );

    const minInput = getByPlaceholderText('Min');
    const maxInput = getByPlaceholderText('Max');

    expect(minInput).toHaveValue('Min');
    expect(maxInput).toHaveValue('Max');
  });
});
