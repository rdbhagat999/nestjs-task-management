import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  description: string;
}
