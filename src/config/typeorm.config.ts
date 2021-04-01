import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'nesttaskmanagement',
  entities: [__dirname + '../**/*.entity.ts'],
  autoLoadEntities: true,
  synchronize: true, // synchronize: true shouldn't be used in production - otherwise you can lose production data.
};
