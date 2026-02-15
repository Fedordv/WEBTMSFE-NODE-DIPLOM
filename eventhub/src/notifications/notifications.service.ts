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

  async log(
    eventId: string,
    status: string,
    message: string,
    channel: string,
    userId: string, // теперь строго string
  ) {
    return this.logRepo.save({ eventId, status, message, channel, userId });
  }

  async count() {
    return this.logRepo.count();
  }

  async findAll() {
    return this.logRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findByEvent(eventId: string) {
    return this.logRepo.find({
      where: { eventId },
      order: { createdAt: 'DESC' },
    });
  }
}
