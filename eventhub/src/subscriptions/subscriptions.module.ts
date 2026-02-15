import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { EventsModule } from '../events/events.module';
import { NotificationsModule } from '../notifications/notifications.module';
//TOKEN_ALPHA=
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4OTE3NWZjMC0zMDg1LTQxOWUtOTA0MC1jMmM2OWU2ZTRlYzEiLCJlbWFpbCI6ImFscGhhQG1haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzExNTczMzksImV4cCI6MTc3MTI0MzczOX0.pFDvZmnAE_T4BEKzEYocmvWkiYfWLZtWayg96rKM7tU
//TOKEN_BETA=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMjAwYTQxZi04N2QwLTQ4MmQtODUwZS1jMzlmMTc1ZTc2MDAiLCJlbWFpbCI6ImJldGFAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc3MTE1NzQ0OSwiZXhwIjoxNzcxMjQzODQ5fQ.HwyCxlLaSoEJWZ3Fad_pMm9fBRG5z2WUeRZIB2xxyL4


@Module({
    imports: [TypeOrmModule.forFeature([Subscription]),
    EventsModule,
    NotificationsModule,
    ],
    providers: [SubscriptionsService],
    exports: [SubscriptionsService],
    controllers: [SubscriptionsController]
})
export class SubscriptionsModule {}