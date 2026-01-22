import { IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiPropertyOptional({
    example: 'Обновлённый текст комментария',
    minLength: 1,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @Length(1, 1000)
  text?: string;
}
