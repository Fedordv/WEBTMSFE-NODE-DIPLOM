import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Event } from '../events/event.entity';
import { Subscription } from '../subscriptions/subscription.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: 'user' | 'admin';

  @OneToMany(() => Event, (event) => event.author)
  events: Event[];

  @OneToMany(() => Subscription, (sub) => sub.user)
  subscriptions: Subscription[];
}