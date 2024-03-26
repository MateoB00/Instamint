export interface UserInterface {
  id: number;
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  profilePicture: string;
  bio: string;
  uniqueLink: string;
  visibility: boolean;
  language: 'English' | 'French' | 'Spanish';
  twoFactorEnabled: boolean;
  twoFactorSecret: string | null;
  searchByEmailOrPhoneEnabled: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  isAdmin: boolean;
}
