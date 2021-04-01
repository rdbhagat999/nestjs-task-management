import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/models/user.entity';
import { CreateTaskDto } from '../dtos/create-task-dto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter-dto';
import { PatchTaskDto } from '../dtos/patch-task-dto';
import { UpdateTaskDto } from '../dtos/update-task-dto';
import { Task } from '../models/task.entity';
import { TaskRepository } from '../repository/task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    protected readonly tasksRepository: TaskRepository,
  ) {}

  async findAll(
    getTasksFilterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    return await this.tasksRepository.findAll(getTasksFilterDto, user);
  }

  async findById(id: number, user: User): Promise<Task> {
    return await this.tasksRepository.findById(id, user);
  }

  async create(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Partial<Task>> {
    return await this.tasksRepository.createTask(createTaskDto, user);
  }

  async patch(
    id: number,
    patchTaskDto: PatchTaskDto,
    user: User,
  ): Promise<Task> {
    return await this.tasksRepository.patchOne(id, patchTaskDto, user);
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    return await this.tasksRepository.updateOne(id, updateTaskDto, user);
  }

  async delete(id: number, user: User): Promise<void> {
    return await this.tasksRepository.deleteById(id, user);
  }
}
