import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUppercase,
} from 'class-validator';
import { TaskStatus } from '../interfaces/task.interface';
export class PatchTaskDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsUppercase()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
