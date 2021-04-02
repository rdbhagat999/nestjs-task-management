import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as CONFIG from 'config';

async function bootstrap() {
  const serverConfig = CONFIG.get('server');
  const logger = new Logger('bootstrap');
  const port = process.env.PORT || serverConfig.port;
  const node_enviroment = process.env.NODE_ENV;

  const app = await NestFactory.create(AppModule);

  if (node_enviroment !== 'production') {
    app.enableCors();
  }

  app.setGlobalPrefix('api');
  app.use(helmet());
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
  logger.debug(
    `App listening on port: ${port} in ${node_enviroment} environment`,
  );
}
bootstrap();
