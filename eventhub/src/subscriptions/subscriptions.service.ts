import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { Logger } from 'nestjs-pino';


@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subRepo: Repository<Subscription>,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    private readonly notificationsService: NotificationsService,
    private readonly logger: Logger,
  ) {}

  async subscribe(user: User, eventId: string) {
    const event = await this.eventRepo.findOne({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');
    this.logger.log(
      `User ${user.email} subscribed to event ${event.title}`,
    );
    const exist = await this.subRepo.findOne({
      where: { user: { id: user.id }, event: { id: event.id } },
    });

    if (exist) return exist;

    const subscription = await this.subRepo.save({ user, event });

    await this.notificationsService.log(
      event.id,
      'sent',
      `User ${user.email} subscribed to event ${event.title}`,
      'email',
      user.id
    );

    return subscription;
  }

  async unsubscribe(user: User, eventId: string) {
    const sub = await this.subRepo.findOne({
      where: { user: { id: user.id }, event: { id: eventId } },
    });

    if (!sub) return { unsubscribed: false };

    await this.subRepo.delete(sub.id);
    this.logger.log(
      `User ${user.email} unsubscribed from event ${eventId}`,
    );

    await this.notificationsService.log(
      eventId,
      'sent',
      `User ${user.email} unsubscribed from event`,
      'email',
      user.id
    );

    return { unsubscribed: true };
  }

  findByEvent(eventId: string) {
    return this.subRepo.find({
      where: { event: { id: eventId } },
      relations: ['user'],
    });
  }

  async findByUser(userId: string) {
  return this.subRepo.find({
    where: { user: { id: userId } },
    relations: ['event'],
  });
 }

}