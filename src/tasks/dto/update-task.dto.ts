import { IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: 'Обновлённое описание задачи',
    minLength: 1,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @Length(1, 1000)
  description?: string;

  @ApiPropertyOptional({
    example: 'Обновлённая заметка',
    minLength: 1,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @Length(1, 1000)
  comment?: string;
}
