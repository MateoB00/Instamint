import { UserInterface } from './userData';

export interface TeabagInterface {
  id: number;
  name: string;
  bio: string;
  link: string;
  profilePicture: string;
  listNfts: string[];
  cooks: UserInterface[];
  numberOfFollowers: number;
  numberOfFolloweds: number;
  followers: UserInterface[];
  followeds: UserInterface[];
  whitelistStartDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
