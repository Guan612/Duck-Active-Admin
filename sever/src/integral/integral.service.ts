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

  findAll() {
    return `This action returns all integral`;
  }

  async findByUserId(userid: number) {
    const res = await this.prisma.integral.findUnique({
      where: {
        userId: userid,
      },
    });
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
  }

  remove(id: number) {
    return `This action removes a #${id} integral`;
  }
}
