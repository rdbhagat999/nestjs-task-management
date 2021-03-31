import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task-dto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter-dto';
import { PatchTaskDto } from '../dtos/patch-task-dto';
import { UpdateTaskDto } from '../dtos/update-task-dto';
import { Task } from '../interfaces/task.interface';
import { TasksService } from '../services/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll(@Query() getTasksFilterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(getTasksFilterDto).length) {
      return this.tasksService.getAllWithFilters(getTasksFilterDto);
    }
    return this.tasksService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Task {
    return this.tasksService.getOne(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() patchTaskDto: PatchTaskDto): Task {
    return this.tasksService.patch(id, patchTaskDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.tasksService.delete(id);
  }
}
