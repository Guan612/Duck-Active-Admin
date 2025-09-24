import { Injectable } from '@nestjs/common';
import { CreateChatroomDto } from './dto/chatroom.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatroomService {
  constructor(private prisma: PrismaService) {}

  async create(createChatroomDto) {
    const res = await this.prisma.chatRoom.create({
      data: createChatroomDto,
    });

    return res;
  }

  findAll() {
    return `This action returns all chatroom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatroom`;
  }

  update(id: number, updateChatroomDto) {
    return `This action updates a #${id} chatroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatroom`;
  }
}
