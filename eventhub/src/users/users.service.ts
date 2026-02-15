import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

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

   async create(email: string, password: string) {
     const hashed = await bcrypt.hash(password, 10);
     const user = this.repo.create({ email, password: hashed });
     return this.repo.save(user);
    }

}  