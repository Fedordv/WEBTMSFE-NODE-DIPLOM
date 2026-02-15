import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Subscription } from '../subscriptions/subscription.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ type: 'timestamptz' })
  date!: Date;

  @ManyToOne(() => User, (user) => user.events, { eager: true })
  author!: User;

  @OneToMany(() => Subscription, (sub) => sub.event)
  subscriptions!: Subscription[];

  @CreateDateColumn()
  createdAt!: Date;
}