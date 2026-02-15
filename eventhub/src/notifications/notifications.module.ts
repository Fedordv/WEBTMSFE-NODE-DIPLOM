import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationLog } from './notification-log.entity';
import { NotificationsService } from './notifications.service';
import { NotificationsProcessor } from './notifications.processor';
import { BullModule } from '@nestjs/bullmq';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module'
import { NotificationsController } from './notifications.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([NotificationLog]),
        forwardRef(() => SubscriptionsModule),
        BullModule.registerQueue({
            name: 'notifications'
        })
    ],
    providers: [NotificationsService, NotificationsProcessor],
    exports: [NotificationsService],
    controllers: [NotificationsController]
})
export class NotificationsModule {}