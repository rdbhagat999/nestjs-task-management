import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from '../dtos/create-task-dto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter-dto';
import { PatchTaskDto } from '../dtos/patch-task-dto';
import { UpdateTaskDto } from '../dtos/update-task-dto';
import { Task } from '../models/task.entity';
import { ITask } from '../models/task.interface';
import { TaskRepository } from '../repository/task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    protected readonly tasksRepository: TaskRepository,
  ) {}

  async findAll(getTasksFilterDto: GetTasksFilterDto): Promise<ITask[]> {
    return await this.tasksRepository.findAll(getTasksFilterDto);
  }

  async findById(id: number): Promise<ITask> {
    return await this.tasksRepository.findById(id);
  }

  async findOne(condition: any): Promise<ITask> {
    return await this.tasksRepository.findOne(condition);
  }

  async create(createTaskDto: CreateTaskDto): Promise<ITask> {
    return await this.tasksRepository.createTask(createTaskDto);
  }

  async patch(id: number, patchTaskDto: PatchTaskDto): Promise<ITask> {
    return await this.tasksRepository.patchOne(id, patchTaskDto);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<ITask> {
    return await this.tasksRepository.updateOne(id, updateTaskDto);
  }

  async delete(id: number): Promise<void> {
    return await this.tasksRepository.deleteById(id);
  }
}
