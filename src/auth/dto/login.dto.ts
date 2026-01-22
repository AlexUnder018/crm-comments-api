import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: '0f2b2c7c-7b0d-4a3f-9d8f-2a2b8e8d4c21' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Password123!', minLength: 6, maxLength: 72 })
  @IsString()
  @Length(6, 72)
  password: string;
}
