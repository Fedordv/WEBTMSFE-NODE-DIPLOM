import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationsCron {
    constructor (
        @InjectQueue('notifications') 
        private readonly queue: Queue,
    ) {}

    @Cron('0 */10 * * * *')
    async cleanup() {
        await this.queue.add('cleanupExpiredEvent', {})
    }

    @Cron('0 */5 * * * *')
    async recalc() {
        await this.queue.add('recalculateStats', {})
    }
}