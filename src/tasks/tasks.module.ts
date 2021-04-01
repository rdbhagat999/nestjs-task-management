import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './controllers/tasks.controller';
import { TaskRepository } from './repository/task.repository';
import { TasksService } from './services/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TypeOrmModule],
})
export class TasksModule {}
