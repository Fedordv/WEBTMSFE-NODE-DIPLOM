import { StringValue } from 'ms';

export const AUTH_OPTIONS = 'AUTH_OPTIONS';

export interface AuthModuleOptions {
  secret: string;
  expiresIn?: StringValue | number;
}
