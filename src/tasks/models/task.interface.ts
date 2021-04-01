import { TaskStatus } from './task-status.enum';

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
