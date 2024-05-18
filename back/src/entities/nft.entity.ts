import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Nft {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float', nullable: true })
  price: number;

  @Column({ type: 'text' })
  mediaUrl: string;

  @Column({ nullable: true })
  location: string;

  @Column()
  pathFirebase: string;

  @Column('simple-array', { nullable: true })
  hashtags: string[];

  @Column({ default: true })
  isDraft: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
