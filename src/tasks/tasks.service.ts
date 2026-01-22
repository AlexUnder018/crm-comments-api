import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  async create(dto: CreateTaskDto, userId: string) {
    const task = this.repo.create({
      ...dto,
      user_id: userId,
    });
    return this.repo.save(task);
  }

  async findAll() {
    return this.repo.find({
      order: { createdAt: 'DESC' }, // новые первыми
    });
  }

  async findOne(id: string) {
    const task = await this.repo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, dto: UpdateTaskDto, userId: string) {
    const task = await this.findOne(id);

    if (task.user_id !== userId) {
      throw new ForbiddenException('You can edit only your tasks');
    }

    Object.assign(task, dto);
    return this.repo.save(task);
  }

  async remove(id: string, userId: string) {
    const task = await this.findOne(id);

    if (task.user_id !== userId) {
      throw new ForbiddenException('You can delete only your tasks');
    }

    await this.repo.delete(id);
    return { deleted: true };
  }
}
