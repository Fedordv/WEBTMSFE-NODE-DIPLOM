import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('notification_logs')
export class NotificationLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({})
  userId!: string;

  @Column()
  eventId!: string;

  @Column({ default: 'system' })
  channel!: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  message?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
