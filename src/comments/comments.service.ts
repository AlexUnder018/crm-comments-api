import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private repo: Repository<Comment>,
    private tasksService: TasksService,
  ) {}

  async create(dto: CreateCommentDto, userId: string) {
    // Проверим, что задача существует
    await this.tasksService.findOne(dto.task_id);

    const comment = this.repo.create({
      task_id: dto.task_id,
      user_id: userId,
      text: dto.text,
    });

    return this.repo.save(comment);
  }

  async findByTask(taskId: string) {
    return this.repo.find({
      where: { task_id: taskId },
      order: { createdAt: 'DESC' }, // новые первыми
    });
  }

  async findOne(id: string) {
    const comment = await this.repo.findOne({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async update(id: string, dto: UpdateCommentDto, userId: string) {
    const comment = await this.findOne(id);

    if (comment.user_id !== userId) {
      throw new ForbiddenException('You can edit only your comments');
    }

    Object.assign(comment, dto);
    return this.repo.save(comment);
  }

  async remove(id: string, userId: string) {
    const comment = await this.findOne(id);

    if (comment.user_id !== userId) {
      throw new ForbiddenException('You can delete only your comments');
    }

    await this.repo.delete(id);
    return { deleted: true };
  }
}
