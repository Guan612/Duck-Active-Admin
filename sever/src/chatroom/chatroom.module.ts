import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/user/guard/jwt.guard';
import { RoleGuard } from 'src/user/guard/role.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ChatroomController],
  providers: [
    ChatroomService,
    JwtAuthGuard,
    RoleGuard,
    PrismaService,
    JwtService,
  ],
})
export class ChatroomModule {}
