import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { JwtAuthGuard } from 'src/user/guard/jwt.guard';
import { RoleGuard } from 'src/user/guard/role.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    ChatService,
    ChatGateway,
    JwtAuthGuard,
    RoleGuard,
    PrismaService,
    JwtService,
  ],
})
export class ChatModule {}
