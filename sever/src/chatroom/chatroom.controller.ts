import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/chatroom.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guard/jwt.guard';
import { RoleGuard } from 'src/user/guard/role.guard';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from 'src/user/dto/user.dto';

@Controller('chatroom')
@ApiTags('chatRoom')
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Post()
  @ApiOperation({ summary: '创建聊天室' })
  @ApiBearerAuth()
  @ApiResponse({})
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Responsible, Role.Teacher, Role.Admin)
  create(@Body() createChatroomDto: CreateChatroomDto) {
    return this.chatroomService.create(createChatroomDto);
  }

  @Get()
  findAll() {
    return this.chatroomService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '单个聊天室信息' })
  @ApiBearerAuth()
  @ApiResponse({})
  findOne(@Param('id') id: string) {
    return this.chatroomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatroomDto) {
    return this.chatroomService.update(+id, updateChatroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatroomService.remove(+id);
  }
}
