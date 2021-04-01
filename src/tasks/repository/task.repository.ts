import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/models/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dtos/create-task-dto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter-dto';
import { PatchTaskDto } from '../dtos/patch-task-dto';
import { UpdateTaskDto } from '../dtos/update-task-dto';
import { Task } from '../models/task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private readonly logger = new Logger('TaskRepository');

  async findAll(
    getTasksFilterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = getTasksFilterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      return await query.getMany();
    } catch ({ message, stack }) {
      this.logger.error(message, stack);
      throw new InternalServerErrorException();
    }
  }

  async findById(id: number, user: User): Promise<Task> {
    if (!id) {
      throw new BadRequestException(`Id is required`);
    }
    const found = await this.findOne({
      where: {
        id,
        userId: user.id,
      },
    });
    if (!found) {
      throw new NotFoundException(`Item with id '${id}' not found!`);
    }
    return found;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    auth: User,
  ): Promise<Partial<Task>> {
    const { user, ...task } = await this.save({ ...createTaskDto, user: auth });
    return task;
  }

  async patchOne(
    id: number,
    patchTaskDto: PatchTaskDto,
    user: User,
  ): Promise<Task> {
    if (!id) {
      throw new BadRequestException(`Id is required`);
    }
    const { status } = patchTaskDto;
    const { affected } = await this.update({ id, userId: user.id }, { status });
    if (affected < 1) {
      throw new NotFoundException(`Item with id '${id}' not found!`);
    }
    return await this.findById(id, user);
  }

  async updateOne(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    if (!id) {
      throw new BadRequestException(`Id is required`);
    }
    const { affected } = await this.update(
      { id, userId: user.id },
      updateTaskDto,
    );
    if (affected < 1) {
      throw new NotFoundException(`Item with id '${id}' not found!`);
    }
    return await this.findById(id, user);
  }

  async deleteById(id: number, user: User): Promise<void> {
    const item = await this.findById(id, user);
    const { affected } = await this.delete({ id: item.id, userId: user.id });
    if (affected < 1) {
      throw new NotFoundException(`Item with id '${id}' not found!`);
    }
  }
}
