import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subRepo: Repository<Subscription>,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) {}

  async subscribe(user: User, eventId: string) {
    const event = await this.eventRepo.findOne({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');

    const exist = await this.subRepo.findOne({
      where: {
        user: { id: user.id },
        event: { id: event.id },
      },
    });

    if (exist) return exist;

    return this.subRepo.save({ user, event });
  }

  async unsubscribe(user: User, eventId: string) {
    const sub = await this.subRepo.findOne({
      where: {
        user: { id: user.id },
        event: { id: eventId },
      },
    });

    if (!sub) return { unsubscribed: false };

    await this.subRepo.delete(sub.id);
    return { unsubscribed: true };
  }

  findByEvent(eventId: string) {
    return this.subRepo.find({
      where: { event: { id: eventId } },
      relations: ['user'],
    });
  }
}