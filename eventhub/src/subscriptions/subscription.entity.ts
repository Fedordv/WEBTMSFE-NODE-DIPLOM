import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Event } from '../events/event.entity';

@Entity('subscriptions')
@Unique(['user', 'event'])
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.subscriptions, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Event, (event) => event.subscriptions, {
    onDelete: 'CASCADE',
  })
  event!: Event;

  @CreateDateColumn()
  createdAt!: Date;
}
