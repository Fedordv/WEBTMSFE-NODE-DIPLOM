import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getAll() {
    return this.notificationsService.findAll();
  }

  @Get('event/:eventId')
  getByEvent(@Param('eventId') eventId: string) {
    return this.notificationsService.findByEvent(eventId);
  }
}
