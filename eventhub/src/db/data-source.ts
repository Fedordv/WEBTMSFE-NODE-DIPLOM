import 'dotenv/config';

import { DataSourceOptions } from 'typeorm';
import { User } from '../users/user.entity';
import { Event } from '../events/event.entity';
import { Subscription } from '../subscriptions/subscription.entity';
import { NotificationLog } from '../notifications/notification-log.entity';


export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Event, Subscription, NotificationLog],
    synchronize: true,
};

// export default new DataSource({
//   ...base,
//   entities: [Task],
//   migrations: [join(__dirname, '..', 'migrations', '*{.ts,.js}')],
//   synchronize: false,
// });
