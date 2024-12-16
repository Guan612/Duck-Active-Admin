import { Injectable } from '@nestjs/common';
import {
  CreateRegistrationDto,
  UpdateRegistrationDto,
} from './dto/registration.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegistrationService {
  constructor(private prisma: PrismaService) {}

  async findMyAddActive(userId) {
    const res = await this.prisma.registration.findMany({
      where: {
        userId: userId,
      },
    });

    return res;
  }

  async joinActive(activeId, userId) {
    const res = await this.prisma.registration.create({
      data: {
        userId: userId,
        activitieId: activeId,
      },
    });
    return res;
  }

  async findIsJonin(activeId, userId) {
    const res = await this.prisma.registration.findMany({
      where: {
        userId: userId,
        activitieId: activeId,
      },
    });
    if (res.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
