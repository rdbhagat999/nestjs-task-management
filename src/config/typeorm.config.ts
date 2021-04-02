import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as CONFIG from 'config';

const {
  type,
  port,
  database,
  host,
  username,
  password,
  synchronize,
} = CONFIG.get('db');

const {
  RDS_HOSTNAME,
  RDS_PORT,
  RDS_USERNAME,
  RDS_PASSWORD,
  RDS_DB_NAME,
  TYPE_ORM_SYNC,
} = process.env;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type,
  host: RDS_HOSTNAME || host,
  port: RDS_PORT || port,
  username: RDS_USERNAME || username,
  password: RDS_PASSWORD || password,
  database: RDS_DB_NAME || database,
  entities: [__dirname + '../**/*.entity.ts'],
  autoLoadEntities: true,
  // synchronize: true shouldn't be used in production - otherwise you can lose production data.
  /* 
  FIRST DEPLOYMENT:
   set synchronize=true and deploy to aws on first run so that schemas are setup automatically, and we don't have to manually set them up later

  SECOND DEPLOYMENT:
   set synchronize=false and deploy again.
  */
  synchronize: TYPE_ORM_SYNC || synchronize,
};
