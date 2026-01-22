import { IsIn, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(6, 72)
  password: string;

  @IsIn(['author', 'user'])
  role: 'author' | 'user';
}
