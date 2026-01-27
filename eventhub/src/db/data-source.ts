import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Event } from '../events/event.entity';
import { Subscription } from '../subscriptions/subscription.entity';
import { NotificationLog } from '../notifications/notification-log.entity';
import { join } from 'path';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  entities: [User, Event, Subscription, NotificationLog],

  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],

  synchronize: false, 
});
