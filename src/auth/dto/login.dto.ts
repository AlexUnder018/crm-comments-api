import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  id: string; // минимально: логинимся по id (в задании нет email/username)

  @IsString()
  @Length(6, 72)
  password: string;
}
