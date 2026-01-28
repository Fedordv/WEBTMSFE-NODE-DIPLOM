import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationLog } from './notification-log.entity';
import { NotificationsService } from './notifications.service';
import { NotificationsProcessor } from './notifications.processor';
import { BullModule } from '@nestjs/bullmq';

@Module({
    imports: [
        TypeOrmModule.forFeature([NotificationLog]),
        BullModule.registerQueue({
            name: 'notofocations'
        })
    ],
    providers: [NotificationsService, NotificationsProcessor],
    exports: [NotificationsService],
})
export class NotificationsModule {}