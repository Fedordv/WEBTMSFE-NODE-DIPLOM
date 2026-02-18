import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTH_OPTIONS, type AuthModuleOptions } from './auth.constants';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Logger } from 'nestjs-pino';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    @Inject(AUTH_OPTIONS) private readonly opts: AuthModuleOptions,
    private readonly usersService: UsersService, 
    private readonly logger: Logger, 
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      this.logger.warn(`Failed login attempt: ${dto.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }
    this.logger.log(`Login success: ${user.email}`);
    return {
      access_token: this.jwt.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }

  verify(token: string) {
    return this.jwt.verify(token, {
      secret: this.opts.secret,
    });
  }
}
