import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(6)
  @MaxLength(50)
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `Passwords must contain at least 1 uppercase, 1 lowercase letter and 1 number or special character`,
  })
  password: string;
}
