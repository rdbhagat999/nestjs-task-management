import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task-dto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter-dto';
import { PatchTaskDto } from '../dtos/patch-task-dto';
import { UpdateTaskDto } from '../dtos/update-task-dto';
import { Task, TaskStatus } from '../interfaces/task.interface';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
  }

  getAllWithFilters(getTasksFilterDto: GetTasksFilterDto): Task[] {
    const { status, search } = getTasksFilterDto;
    let tasks = this.getAll();

    if (status) {
      tasks = tasks.filter((t: Task) => t.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (t: Task) => t.title.includes(search) || t.description.includes(search),
      );
    }

    return tasks;
  }

  getOne(id: string): Task {
    return this.tasks.find((t: Task) => t.id === id);
  }

  create(createTaskDto: CreateTaskDto): Task {
    const id = new Date().getTime().toString();
    const { title, description } = createTaskDto;

    const task: Task = {
      id,
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  patch(id: string, patchTaskDto: PatchTaskDto): Task {
    const { status } = patchTaskDto;
    const task = this.getOne(id);
    task.status = status;
    return this.getOne(id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.getOne(id);

    const newTask: Task = Object.assign({}, task, updateTaskDto);

    this.tasks = this.tasks.map((t: Task) => {
      if (t.id === id) {
        t = newTask;
      }
      return t;
    });

    return this.getOne(id);
  }

  delete(id: string): void {
    this.tasks = this.tasks.filter((t: Task) => t.id !== id);
  }
}
