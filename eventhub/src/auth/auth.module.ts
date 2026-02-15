import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module'

import { AUTH_OPTIONS, AuthModuleOptions } from './auth.constants';
import { AuthOptionsModule } from './auth-options.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    UsersModule,

    AuthOptionsModule, 

    JwtModule.registerAsync({
      imports: [AuthOptionsModule], 
      inject: [AUTH_OPTIONS],
      useFactory: (opts: AuthModuleOptions) => ({
        secret: opts.secret,
        signOptions: {
          expiresIn: opts.expiresIn ?? '15m',
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
