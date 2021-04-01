import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dtos/create-task-dto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter-dto';
import { PatchTaskDto } from '../dtos/patch-task-dto';
import { UpdateTaskDto } from '../dtos/update-task-dto';
import { TaskEntity } from '../models/task.entity';
import { ITask } from '../models/task.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    protected tasksRepository: Repository<TaskEntity>,
  ) {}

  async findAll(getTasksFilterDto: GetTasksFilterDto): Promise<ITask[]> {
    const { status, search } = getTasksFilterDto;
    const query = this.tasksRepository.createQueryBuilder('tasks');

    if (status) {
      query.andWhere('tasks.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(tasks.title LIKE :search OR tasks.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }

  async findById(id: number): Promise<ITask> {
    if (!id) {
      throw new BadRequestException(`Id is required`);
    }
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Item with id '${id}' not found!`);
    }
    return found;
  }

  async findOne(condition: any): Promise<ITask> {
    return await this.tasksRepository.findOne(condition);
  }

  async create(createTaskDto: CreateTaskDto): Promise<ITask> {
    const { title, description } = createTaskDto;
    const item: Partial<ITask> = {
      title,
      description,
    };
    return await this.tasksRepository.save(item);
  }

  async patch(id: number, patchTaskDto: PatchTaskDto): Promise<ITask> {
    if (!id) {
      throw new BadRequestException(`Id is required`);
    }
    const { status } = patchTaskDto;
    const { affected } = await this.tasksRepository.update(id, { status });
    if (affected < 1) {
      throw new NotFoundException(`Item with id '${id}' not found!`);
    }
    return await this.findById(id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<ITask> {
    if (!id) {
      throw new BadRequestException(`Id is required`);
    }
    const { affected } = await this.tasksRepository.update(id, updateTaskDto);
    if (affected < 1) {
      throw new NotFoundException(`Item with id '${id}' not found!`);
    }
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const item = await this.findById(id);
    const { affected } = await this.tasksRepository.delete(item.id);
    if (affected < 1) {
      throw new NotFoundException(`Item with id '${id}' not found!`);
    }
  }
}
