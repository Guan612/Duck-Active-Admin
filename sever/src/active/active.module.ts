import { Module } from '@nestjs/common';
import { ActiveService } from './active.service';
import { ActiveController } from './active.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ActiveController],
  providers: [ActiveService, PrismaService,JwtService],
})
export class ActiveModule {}
