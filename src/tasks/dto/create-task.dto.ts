import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Подготовить тестовое задание: CRUD задач и комментариев',
    minLength: 1,
    maxLength: 1000,
  })
  @IsString()
  @Length(1, 1000)
  description: string;

  @ApiPropertyOptional({
    example: 'Опциональная заметка к задаче (не комментарии)',
    minLength: 1,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @Length(1, 1000)
  comment?: string;
}
