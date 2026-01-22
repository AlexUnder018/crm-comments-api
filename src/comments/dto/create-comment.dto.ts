import { IsString, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'b7d7c3d0-7f5a-4c7a-8a4a-1e2f3a4b5c6d' })
  @IsUUID()
  task_id: string;

  @ApiProperty({
    example: 'Проверил задачу. Добавь валидацию и Swagger examples.',
    minLength: 1,
    maxLength: 1000,
  })
  @IsString()
  @Length(1, 1000)
  text: string;
}
