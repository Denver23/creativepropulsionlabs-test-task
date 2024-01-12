import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

const ENV_FILE = `${process.env.ENV || ''}.env`;
const ENV_PATH = path.resolve(process.cwd(), ENV_FILE);

config({ path: ENV_PATH });
async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: true,
  });

  app.use(
    helmet({
      hidePoweredBy: true,
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      referrerPolicy: false,
      frameguard: false,
    }),
  );

  app.enableShutdownHooks();

  const options = new DocumentBuilder().setTitle('User API').setDescription('User API').setVersion('1.0.0').addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  const configService = app.get(ConfigService);

  await app.listen(configService.get('server.port'), () => {
    Logger.log(`API: http://${configService.get('server.host')}:${configService.get('server.port')}`, 'APP');
    Logger.log(`Swagger: http://${configService.get('server.host')}:${configService.get('server.port')}/api-docs/#`, 'APP');
  });
}

bootstrap();
