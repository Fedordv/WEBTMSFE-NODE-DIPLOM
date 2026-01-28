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
        await this.notificationsService.log(
          eventId,
          'sent',
          `Notification sent to ${sub.user.email}`,
        );
      }
    }

    if (job.name === 'recalculateStats') {
      await this.notificationsService.log(
        'system',
        'stats',
        'Stats recalculated',
      );
    }

    if (job.name === 'cleanupExpiredEvents') {
      await this.notificationsService.log(
        'system',
        'cleanup',
        'Expired events cleaned',
      );
    }

    return true;
  }
}
