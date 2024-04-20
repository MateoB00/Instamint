import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NFT {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: number;

  @Column()
  nftImageUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
