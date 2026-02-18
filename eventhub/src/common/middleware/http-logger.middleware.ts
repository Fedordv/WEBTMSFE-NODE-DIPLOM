import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - start;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${responseTime}ms`,
      );
    });

    next();
  }
}
