import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationLog } from './notification-log.entity';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(NotificationLog)
        private logRepo: Repository<NotificationLog>,
    ) {}

    async log(eventId: string, status: string, message: string) {
        return this.logRepo.save({ eventId, status, message});
    }

    async count() {
        return this.logRepo.count()
    }
}