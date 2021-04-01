import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsUppercase,
  IsString,
} from 'class-validator';
import { TaskStatus } from '../models/task-status.enum';
export class PatchTaskDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsUppercase()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
