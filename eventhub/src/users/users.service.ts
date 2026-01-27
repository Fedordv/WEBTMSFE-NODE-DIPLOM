import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) {}

   findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
   }

   findById(id: string) {
    return this.repo.findOne({ where: {id} })
   }

   create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user)
   }
}  