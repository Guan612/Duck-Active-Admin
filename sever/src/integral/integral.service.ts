import { Injectable } from '@nestjs/common';
import { CreateIntegralDto } from './dto/integral.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IntegralService {
  constructor(private prisma: PrismaService) {}

  async create(createIntegralDto) {
    const res = await this.prisma.integral.create({
      data: createIntegralDto,
    });
    return res;
  }

  async findAll() {
    const res = await this.prisma.integral.findMany({
      include: {
        user: {
          select: {
            loginId: true,
            nickname: true,
          },
        },
      },
    });

    return res;
  }

  async findByUserId(userid: number) {
    const res = await this.prisma.integral.findUnique({
      where: {
        userId: userid,
      },
    });
    // 解构并排除不需要的字段
    const { id, userId, ...result } = res || {};
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} integral`;
  }

  async update(id: number, updateIntegralDto) {
    const res = this.prisma.integral.update({
      where: {
        userId: id,
      },
      data: updateIntegralDto,
    });
    return res;
  }

  remove(id: number) {
    return `This action removes a #${id} integral`;
  }

  async addActivityPoints(activityId: number) {
    // 1. 查询活动信息
    const activity = await this.prisma.activitie.findUnique({
      where: { id: activityId },
      select: {
        activitieType: true,
        point: true,
      },
    });

    if (!activity) {
      throw new Error('Activity not found');
    }

    // 2. 查询活动参与者
    const participants = await this.prisma.registration.findMany({
      where: {
        activitieId: activityId,
        status: 2, // 只处理已参加活动的用户
      },
      select: {
        userId: true,
      },
    });

    // 3. 根据活动类型更新积分
    const updateData: {
      learnedPoints?: { increment: number };
      actionPoints?: { increment: number };
      beautyPoints?: { increment: number };
      moralPoints?: { increment: number };
    } = {};
    switch (activity.activitieType) {
      case 1: // 博学
        updateData['learnedPoints'] = { increment: activity.point };
        break;
      case 2: // 笃行
        updateData['actionPoints'] = { increment: activity.point };
        break;
      case 3: // 尽美
        updateData['beautyPoints'] = { increment: activity.point };
        break;
      case 4: // 明德
        updateData['moralPoints'] = { increment: activity.point };
        break;
      default:
        throw new Error('Invalid activity type');
    }

    // 4. 批量更新参与者积分
    await this.prisma.$transaction(
      participants.map((participant) =>
        this.prisma.integral.upsert({
          where: { userId: participant.userId },
          update: updateData,
          create: {
            userId: participant.userId,
            learnedPoints: updateData.learnedPoints?.increment || 0,
            actionPoints: updateData.actionPoints?.increment || 0,
            beautyPoints: updateData.beautyPoints?.increment || 0,
            moralPoints: updateData.moralPoints?.increment || 0,
          },
        }),
      ),
    );

    await this.prisma.activitie.update({
      where: { id: activityId },
      data: { activitStatus: 5 }, // 更新活动状态为已完成
    });

    return { success: true, updatedCount: participants.length };
  }
}
