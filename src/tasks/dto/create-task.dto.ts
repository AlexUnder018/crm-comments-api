import { IsString, Length, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(1, 1000)
  description: string;

  @IsOptional()
  @IsString()
  @Length(1, 1000)
  comment?: string;
}
