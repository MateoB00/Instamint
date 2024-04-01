import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import UpdateProfile from '../../../src/components/userProfile/updateProfile';
import { UserInterface } from '../../../src/interfaces/userData';

describe('UpdateProfile component', () => {
  test('renders correctly', () => {
    const mockUser: UserInterface = {
      id: 1,
      email: 'Test@test.com',
      password: 'test',
      username: 'test',
      phoneNumber: 'test',
      profilePicture: 'test',
      bio: 'test',
      uniqueLink: 'test',
      visibility: true,
      language: 'English',
      twoFactorEnabled: true,
      twoFactorSecret: 'test',
      searchByEmailOrPhoneEnabled: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: true,
      isAdmin: false,
    };

    const fieldsFormPersonalInformations = [
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        placeholder: 'test',
      },
      {
        name: 'searchByEmailOrPhoneEnabled',
        type: 'checkbox',
        label: 'Search By Email Or Phone',
        placeholder: 'test',
      },
    ];

    const { getByRole, getByLabelText } = render(
      <UpdateProfile userData={mockUser} />,
    );

    const personalInfoHeading = getByRole('heading', { level: 1 });
    expect(personalInfoHeading).toHaveTextContent('Personal Informations');

    fieldsFormPersonalInformations.forEach((field) => {
      const inputField = getByLabelText(field.label);
      expect(inputField).toBeInTheDocument();
      expect(inputField).toHaveAttribute('placeholder', field.placeholder);
    });
  });
});
