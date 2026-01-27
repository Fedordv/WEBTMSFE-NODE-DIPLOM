import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor (private readonly userservice: UsersService) {}

    @Get('id')
    getOne(@Param('id') id: string ) {
        return this.userservice.findById(id);
    }
}