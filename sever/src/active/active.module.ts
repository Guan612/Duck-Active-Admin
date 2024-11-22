import { Module } from '@nestjs/common';
import { ActiveService } from './active.service';
import { ActiveController } from './active.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ActiveController],
  providers: [ActiveService,PrismaService],
})
export class ActiveModule {}
