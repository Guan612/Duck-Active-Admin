import { Module } from '@nestjs/common';
import { IntegralService } from './integral.service';
import { IntegralController } from './integral.controller';
import { JwtAuthGuard } from 'src/user/guard/jwt.guard';
import { RoleGuard } from 'src/user/guard/role.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [IntegralController],
  providers: [
    IntegralService,
    JwtAuthGuard,
    RoleGuard,
    PrismaService,
    JwtService,
  ],
})
export class IntegralModule {}
