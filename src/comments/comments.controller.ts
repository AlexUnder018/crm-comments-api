import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsService } from './comments.service';

type AuthRequest = Request & { user: { id: string } };

@Controller('comments')
export class CommentsController {
  constructor(private comments: CommentsService) {}

  // Только author может создать комментарий
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('author')
  @Post()
  create(@Body() dto: CreateCommentDto, @Req() req: AuthRequest) {
    return this.comments.create(dto, req.user.id);
  }

  // GET /comments?task_id=xxx
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findByTask(@Query('task_id') taskId: string) {
    return this.comments.findByTask(taskId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comments.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto,
    @Req() req: AuthRequest,
  ) {
    return this.comments.update(id, dto, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.comments.remove(id, req.user.id);
  }
}
