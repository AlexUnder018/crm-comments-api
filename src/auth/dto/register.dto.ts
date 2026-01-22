import { IsIn, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Password123!', minLength: 6, maxLength: 72 })
  @IsString()
  @Length(6, 72)
  password: string;

  @ApiProperty({ example: 'user', enum: ['author', 'user'] })
  @IsIn(['author', 'user'])
  role: 'author' | 'user';
}
