import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/models/user.entity';
import { CreateTaskDto } from '../dtos/create-task-dto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter-dto';
import { PatchTaskDto } from '../dtos/patch-task-dto';
import { UpdateTaskDto } from '../dtos/update-task-dto';
import { Task } from '../models/task.entity';
import { TasksService } from '../services/tasks.service';

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger('TasksController');

  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll(
    @GetUser() user: User,
    @Query() getTasksFilterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User ${user.username} retrieving all tasks with filters ${JSON.stringify(
        getTasksFilterDto,
      )}`,
    );
    return this.tasksService.findAll(getTasksFilterDto, user);
  }

  @Get(':id')
  findById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    return this.tasksService.findById(id, user);
  }

  @Post()
  create(
    @GetUser() user: User,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Partial<Task>> {
    this.logger.verbose(
      `User ${user.username} creating task with data ${JSON.stringify(
        CreateTaskDto,
      )}`,
    );
    return this.tasksService.create(createTaskDto, user);
  }

  @Patch(':id')
  patch(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() patchTaskDto: PatchTaskDto,
  ): Promise<Task> {
    return this.tasksService.patch(id, patchTaskDto, user);
  }

  @Put(':id')
  update(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  delete(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    this.logger.verbose(
      `User ${user.username} deleting task with id ${JSON.stringify(id)}`,
    );
    return this.tasksService.delete(id, user);
  }
}
