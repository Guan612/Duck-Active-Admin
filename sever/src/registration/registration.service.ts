import { Injectable } from '@nestjs/common';
import {
  CreateRegistrationDto,
  UpdateRegistrationDto,
} from './dto/registration.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegistrationService {
  constructor(private prisma: PrismaService) {}

  //查询我的报名信息
  async findMyAddActive(userId) {
    const res = await this.prisma.registration.findMany({
      where: {
        userId: userId,
      },
    });

    return res;
  }

  //加入活动
  async joinActive(activeId, userId) {
    const res = await this.prisma.registration.create({
      data: {
        userId: userId,
        activitieId: activeId,
      },
    });
    return res;
  }

  //查询是否已经报名
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
