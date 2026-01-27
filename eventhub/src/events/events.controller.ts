import { Controller,  Post, Body, UseGuards,  Get, Param, Delete, Req, } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from "src/common/guards/roles.guard";

@Controller('events')
export class EventsController {
    constructor (private readonly eventsService: EventsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateEventDto, @Req() req: any) {
        return this.eventsService.create(dto, req.user);
    }

    @Get()
    findAll() {
        return this.eventsService.findAll()
    }

    @Get(':id')
    findOne(@Param(':id') id: string) {
        return this.eventsService.findOne(id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.eventsService.remove(id);
    }
}