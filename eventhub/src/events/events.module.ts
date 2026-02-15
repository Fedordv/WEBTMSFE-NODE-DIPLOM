import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { BullModule } from '@nestjs/bullmq';

@Module({
    imports: [
        TypeOrmModule.forFeature([Event]),
        BullModule.registerQueue({
            name: 'notifications'
        }),
    ],
    exports: [TypeOrmModule],
    providers: [ EventsService ],
    controllers: [ EventsController ],
})
export class EventsModule {}