import {
  Controller,
  Post,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionsController {
  constructor(private readonly subsService: SubscriptionsService) {}

  @Post(':eventId')
  subscribe(@Param('eventId') eventId: string, @Req() req: any) {
    return this.subsService.subscribe(req.user, eventId);
  }

  @Delete(':eventId')
  unsubscribe(@Param('eventId') eventId: string, @Req() req: any) {
    return this.subsService.unsubscribe(req.user, eventId);
  }
}
