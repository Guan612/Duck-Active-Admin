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
