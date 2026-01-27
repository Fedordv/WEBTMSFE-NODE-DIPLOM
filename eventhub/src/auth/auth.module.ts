import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AUTH_OPTIONS, AuthModuleOptions } from './auth.constants';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      inject: [AUTH_OPTIONS],
      useFactory: (opts: AuthModuleOptions) => ({
        secret: opts.secret,
        signOptions: {
          expiresIn: opts.expiresIn ?? '15m',
        },
      }),
    }),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    {
      provide: AUTH_OPTIONS,
      useValue: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES,
      },
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
