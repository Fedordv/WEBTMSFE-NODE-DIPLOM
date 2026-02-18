import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { User } from '../users/user.entity';
import { Logger } from 'nestjs-pino';


@Injectable()
export class EventsService {
    constructor (
        @InjectRepository(Event)
        private eventRepo: Repository<Event>,
        @InjectQueue('notifications')
        private notificationsQueue: Queue,
        private readonly logger: Logger,
    ) {}

    async create(dto: CreateEventDto, author: User) {
        const event = this.eventRepo.create({
            title: dto.title,
            description: dto.description,
            date: new Date(dto.date),
            author,
        });

        const saved = await this.eventRepo.save(event);

        await this.notificationsQueue.add('sendNotification', {
            eventId: saved.id,
        });

        this.logger.log(
         `Event created: ${saved.title} by ${author.email}`,
        );

        return saved;
    }

    findAll() {
        return this.eventRepo.find()
    }

    async findOne(id: string) {
        const event = await this.eventRepo.findOne({ where: {id} })
        if (!event) throw new NotFoundException('Event not found')
        return event
    }

    async remove(id: string) {
        const res = await this.eventRepo.delete(id)
        if (res.affected === 0) {
        this.logger.warn(`Attempt to delete non-existing event ${id}`);
        throw new NotFoundException('Event Not Found');
        }

        this.logger.log(`Event deleted: ${id}`);       
        return { deleted: true }
    }
}