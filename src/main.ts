import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const port = 3000;

  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableCors();
  app.use(cookieParser());
  app.use(
    session({
      secret: 'app-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  // app.use(csurf());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );
  await app.listen(port);
  logger.debug(`App listening on port: ${port}`);
}
bootstrap();
