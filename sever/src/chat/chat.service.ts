import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async crate(createChatContexDto) {
    const res = await this.prisma.chatContext.create({
      data: createChatContexDto,
    });

    return res;
  }
}
