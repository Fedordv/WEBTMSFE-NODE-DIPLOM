import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/db.config';
import { AdminModule } from './admin/admin.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import { HealthModule } from './common/health.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpLoggerMiddleware } from './common/middleware/http-logger.middleware';



@Module({
  imports: [

    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              options: { colorize: true },
            },
            {
              target: 'pino/file',
              options: { destination: './logs/app.log' },
            },
          ],
        },
      },
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      load: [dbConfig],
    }),

    ScheduleModule.forRoot(),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const db = config.get('db');
        return {
          ...db,
          autoLoadEntities: true,
        };
      },
    }),

    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),

    AuthModule,
    UsersModule,
    EventsModule,
    SubscriptionsModule,
    NotificationsModule,
    AdminModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}