import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { ITask } from './task.interface';

@Entity()
export class Task implements ITask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TaskStatus.OPEN })
  status: TaskStatus;
}
