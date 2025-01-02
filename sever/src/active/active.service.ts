import { Injectable } from '@nestjs/common';
import { CreateActiveDto, UpdateActiveDto } from './dto/active.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActiveService {
  constructor(private prisma: PrismaService) {}

  async create(createActiveDto: CreateActiveDto) {
    const res = await this.prisma.activitie.create({
      data: createActiveDto,
    });
    return res;
  }

  async findAll() {
    const res = await this.prisma.activitie.findMany();
    return res;
  }

  async findOne(id: number) {
    const res = await this.prisma.activitie.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            nickname: true,
            loginId: true,
          },
        },
      },
    });
    if (!res) {
      return null;
    }
    // 解构 user 的属性，并返回到顶级
    const { user, ...rest } = res;
    return {
      ...rest,
      nickname: user?.nickname,
      loginId: user?.loginId,
    };
  }

  async findByCreatUser(id: number) {
    const res = await this.prisma.activitie.findMany({
      where: {
        createdPeople: id,
      },
    });
    return res;
  }

  async findByStatus(status: number[]) {
    const res = await this.prisma.activitie.findMany({
      where: {
        activitStatus: {
          in: status,
        },
      },
    });
    return res;
  }

  async findByTime(startDate, endDate) {
    const res = await this.prisma.activitie.findMany({
      where: {
        startDate: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return res;
  }

  async findNewActive() {
    const res = await this.prisma.activitie.findMany({
      where: {
        activitStatus: 1,
      },
      orderBy: {
        startDate: 'desc',
      },
      take:3,
    });
    return res;
  }

  async update(id: number, updateActiveDto: UpdateActiveDto) {
    const res = await this.prisma.activitie.update({
      where: {
        id: id,
      },
      data: updateActiveDto,
    });
    return res;
  }

  async remove(id: number) {
    const res = await this.prisma.activitie.delete({
      where: {
        id: id,
      },
    });
    return res;
  }
}
