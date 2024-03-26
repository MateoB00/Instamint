import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ItemsProfile from '../../../src/components/userProfile/itemsProfile';

describe('ItemsProfile component', () => {
  test('renders Status buttons', () => {
    const { getByText } = render(<ItemsProfile />);

    expect(getByText('Status')).toBeInTheDocument();
    expect(getByText('All')).toBeInTheDocument();
    expect(getByText('New')).toBeInTheDocument();
    expect(getByText('Most likes')).toBeInTheDocument();
  });

  test('renders Price inputs', () => {
    const { getByText, getByPlaceholderText } = render(<ItemsProfile />);

    expect(getByText('Price')).toBeInTheDocument();
    expect(getByPlaceholderText('Min')).toBeInTheDocument();
    expect(getByPlaceholderText('Max')).toBeInTheDocument();
  });

  test('Price inputs are initially empty', () => {
    const { getByPlaceholderText } = render(<ItemsProfile />);

    const minInput = getByPlaceholderText('Min');
    const maxInput = getByPlaceholderText('Max');

    expect(minInput).toHaveValue('Min');
    expect(maxInput).toHaveValue('Max');
  });
});
