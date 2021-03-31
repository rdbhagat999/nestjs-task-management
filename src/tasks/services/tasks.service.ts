import { Injectable } from '@nestjs/common';
import { Task } from '../interfaces/task.interface';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
  }
}
