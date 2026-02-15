import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // → /api/users
export class UsersController {
  constructor(private readonly userservice: UsersService) {}

  @Post()
  create(@Body() body: { email: string; password: string }) {
    return this.userservice.create(body.email, body.password);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userservice.findById(id);
  }
}
