import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupBullBoard } from './bull-board';
import { notificationsQueue } from './notifications/notifications.queue';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggerErrorInterceptor } from 'nestjs-pino';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = new Logger('Bootstrap');
  app.useLogger(logger);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true 
    }),
  );

  setupBullBoard(app, [notificationsQueue]);
  app.useGlobalInterceptors(
    app.get(LoggerErrorInterceptor),
    new ResponseInterceptor(),
  )
  
  app.useGlobalFilters(new AllExceptionsFilter())

  await app.listen(process.env.PORT ?? 3000);

  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`Application successfully started at ${new Date().toISOString()}`);
}
bootstrap();
