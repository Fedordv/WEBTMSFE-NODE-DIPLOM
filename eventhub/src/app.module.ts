import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; 
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { AppConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRoot ({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
    BullModule.forRoot ({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    AuthModule,
    UsersModule,
    EventsModule,
    NotificationsModule,
    SubscriptionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
