import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CardProfile from '../../../src/components/userProfile/cardProfile';
import { UserInterface } from '../../../src/interfaces/userData';

// Mock de Granim
jest.mock('granim', () => ({
  default: jest.fn(),
}));

const mockUserData: UserInterface = {
  id: 1,
  email: 'test@gmail.com',
  password: 'password',
  phoneNumber: '0000',
  uniqueLink: 'unique-link',
  username: 'JohnDoe',
  language: 'English',
  bio: 'Lorem ipsum dolor sit amet',
  profilePicture: 'https://example.com/profile.jpg',
  visibility: false,
  twoFactorEnabled: false,
  twoFactorSecret: null,
  searchByEmailOrPhoneEnabled: false,
  lastLogin: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  isVerified: false,
  isAdmin: false,
};

describe('CardProfile component', () => {
  test('renders correctly', () => {
    const { getByText, getByAltText } = render(
      <CardProfile userData={mockUserData} />,
    );

    expect(getByAltText('profilePicture')).toBeInTheDocument();
    expect(
      getByText(`${mockUserData.username} | ${mockUserData.language}`),
    ).toBeInTheDocument();
    expect(getByText(mockUserData.bio)).toBeInTheDocument();

    expect(getByText('Followers').previousSibling?.textContent).toBe('0');
    expect(getByText('Followings').previousSibling?.textContent).toBe('0');
    expect(getByText('NFTs').previousSibling?.textContent).toBe('0');
    expect(getByText('Drafts').previousSibling?.textContent).toBe('0');
  });
});
