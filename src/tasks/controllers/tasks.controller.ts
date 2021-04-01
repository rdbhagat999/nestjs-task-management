import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task-dto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter-dto';
import { PatchTaskDto } from '../dtos/patch-task-dto';
import { UpdateTaskDto } from '../dtos/update-task-dto';
import { ITask } from '../models/task.interface';
import { TasksService } from '../services/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll(@Query() getTasksFilterDto: GetTasksFilterDto): Promise<ITask[]> {
    return this.tasksService.findAll(getTasksFilterDto);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<ITask> {
    return this.tasksService.findById(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<ITask> {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchTaskDto: PatchTaskDto,
  ): Promise<ITask> {
    return this.tasksService.patch(id, patchTaskDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ITask> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.delete(id);
  }
}
