import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUppercase,
} from 'class-validator';
import { TaskStatus } from '../models/task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsString()
  @IsUppercase()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search: string;
}
