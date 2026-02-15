import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationsService } from './notifications.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Processor('notifications')
export class NotificationsProcessor extends WorkerHost {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly subsService: SubscriptionsService,
  ) {
    super();
  }

  async process(job: Job) {
    if (job.name === 'sendNotification') {
      const { eventId } = job.data;

      const subs = await this.subsService.findByEvent(eventId);

      for (const sub of subs) {
        // передаем реальный userId
        await this.notificationsService.log(
          eventId,
          'sent',
          `Notification sent to ${sub.user.email}`,
          'email',
          sub.user.id, 
        );
      }
    }

    if (job.name === 'recalculateStats') {
      await this.notificationsService.log(
        'system',
        'stats',
        'Stats recalculated',
        'system',
        'system', // для системных логов можно передавать какой-то фиктивный ID
      );
    }

    if (job.name === 'cleanupExpiredEvents') {
      await this.notificationsService.log(
        'system',
        'cleanup',
        'Expired events cleaned',
        'system',
        'system',
      );
    }

    return true;
  }
}
