import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dtos/create-task-dto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter-dto';
import { PatchTaskDto } from '../dtos/patch-task-dto';
import { UpdateTaskDto } from '../dtos/update-task-dto';
import { Task } from '../models/task.entity';
import { ITask } from '../models/task.interface';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async findAll(getTasksFilterDto: GetTasksFilterDto): Promise<ITask[]> {
    const { status, search } = getTasksFilterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }

  async findById(id: number): Promise<ITask> {
    if (!id) {
      throw new BadRequestException(`Id is required`);
    }
    const found = await this.findOne(id);
    if (!found) {
      throw new NotFoundException(`Item with id '${id}' not found!`);
    }
    return found;
  }

  async findOne(condition: any): Promise<ITask> {
    return await this.findOne(condition);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
    const { title, description } = createTaskDto;
    const item: Partial<ITask> = {
      title,
      description,
    };
    return await this.save(item);
  }

  async patchOne(id: number, patchTaskDto: PatchTaskDto): Promise<ITask> {
    if (!id) {
      throw new BadRequestException(`Id is required`);
    }
    const { status } = patchTaskDto;
    const { affected } = await this.update(id, { status });
    if (affected < 1) {
      throw new NotFoundException(`Item with id '${id}' not found!`);
    }
    return await this.findById(id);
  }

  async updateOne(id: number, updateTaskDto: UpdateTaskDto): Promise<ITask> {
    if (!id) {
      throw new BadRequestException(`Id is required`);
    }
    const { affected } = await this.update(id, updateTaskDto);
    if (affected < 1) {
      throw new NotFoundException(`Item with id '${id}' not found!`);
    }
    return await this.findById(id);
  }

  async deleteById(id: number): Promise<void> {
    const item = await this.findById(id);
    const { affected } = await this.delete(item.id);
    if (affected < 1) {
      throw new NotFoundException(`Item with id '${id}' not found!`);
    }
  }
}
