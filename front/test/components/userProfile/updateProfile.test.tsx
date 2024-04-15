import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import UpdateProfile from '../../../src/components/userProfile/updateProfile';

jest.mock('i18n', () => ({
  default: jest.fn(),
}));

describe('UpdateProfile component', () => {
  test('renders correctly', () => {
    const { getByRole } = render(<UpdateProfile />);

    const personalInfoHeading = getByRole('heading', { level: 1 });
    const confidentialInfoHeading = getByRole('heading', { level: 2 });

    expect(personalInfoHeading).toHaveTextContent('Personal Informations');
    expect(confidentialInfoHeading).toHaveTextContent(
      'Confidential Informations',
    );
  });
});
