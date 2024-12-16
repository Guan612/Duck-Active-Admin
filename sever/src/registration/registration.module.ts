import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ActiveService } from 'src/active/active.service';

@Module({
  controllers: [RegistrationController],
  providers: [RegistrationService, PrismaService, JwtService, ActiveService],
})
export class RegistrationModule {}
