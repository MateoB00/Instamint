import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Notification } from './notifications.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column()
  phoneNumber: string;

  @Column()
  profilePicture: string;

  @Column()
  bio: string;

  @Column({ unique: true })
  uniqueLink: string;

  @Column({ default: true })
  visibility: boolean;

  @Column({
    type: 'enum',
    enum: ['English', 'French', 'Spanish'],
    default: 'English',
  })
  language: string;

  @Column({ default: false })
  twoFactorEnabled: boolean;

  @Column({ nullable: true })
  twoFactorSecret: string;

  @Column({ nullable: true })
  otpPath: string;

  @Column({ default: false })
  searchByEmailOrPhoneEnabled: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: 'private' })
  profileVisibility: 'private' | 'public';

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}

export { Notification };
