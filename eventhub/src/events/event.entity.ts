import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn,} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Event {
  [x: string]: any;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamptz' })
  date: Date;

  @ManyToOne(() => User, (user) => user.events, { eager: true })
  author: User;

  @CreateDateColumn()
  createdAt: Date;
}
