import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Teabag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  bio: string;

  @Column({ unique: true })
  link: string;

  @Column()
  profilePicture: string;

  @Column('simple-array', { array: true, nullable: true })
  listNfts: string[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @ManyToMany(() => User)
  @JoinTable()
  cooks: User[];

  @ManyToMany(() => User)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User)
  @JoinTable()
  followed: User[];

  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  private whitelist: User[];

  @Column({ type: 'timestamp', nullable: true })
  whitelistStartDate: Date | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  get numberFollower(): number {
    return this.followers ? this.followers.length : 0;
  }

  get numberFollowed(): number {
    return this.followed ? this.followed.length : 0;
  }

  get numberCook(): number {
    return this.cooks ? this.cooks.length : 0;
  }

  get whiteList(): User[] {
    return this.whitelist ? this.whiteList : [];
  }
}
