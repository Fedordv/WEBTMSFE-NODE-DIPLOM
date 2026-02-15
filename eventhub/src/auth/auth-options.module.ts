import { Module } from '@nestjs/common';
import { AUTH_OPTIONS, AuthModuleOptions } from './auth.constants';
import { StringValue } from 'ms';

@Module({
  providers: [
    {
      provide: AUTH_OPTIONS,
      useFactory: (): AuthModuleOptions => ({
        secret: process.env.JWT_SECRET ?? 'dev-secret',
        expiresIn: (process.env.JWT_EXPIRES as StringValue) ?? '15m',
      }),
    },
  ],
  exports: [AUTH_OPTIONS],
})
export class AuthOptionsModule {}
