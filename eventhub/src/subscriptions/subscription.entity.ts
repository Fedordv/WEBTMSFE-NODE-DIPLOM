import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;

  @Column()
  topic: string;
}
