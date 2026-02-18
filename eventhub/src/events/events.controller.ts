import { Controller,  Post, Body, UseGuards,  Get, Param, Delete, Req, HttpCode, } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { NormalizeEventPipe } from '../common/pipes/normalize-event.pipe';

@Controller('events')
export class EventsController {
    constructor (private readonly eventsService: EventsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(201)
    create(@Body(NormalizeEventPipe) dto: CreateEventDto, @Req() req: any) {
        return this.eventsService.create(dto, req.user);
    }

    @Get()
    findAll() {
        return this.eventsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.eventsService.findOne(id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.eventsService.remove(id);
    }
}