import { Injectable } from '@nestjs/common';
import {
  CreateRegistrationDto,
  UpdateRegistrationDto,
} from './dto/registration.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegistrationService {
  constructor(private prisma: PrismaService) {}

  async create(createRegistrationDto: CreateRegistrationDto) {
    const res = await this.prisma.registration.create({
      data: createRegistrationDto,
    });
    return res;
  }

  async findAll() {
    const res = await this.prisma.registration.findMany();
    return res;
  }

  async findOne(id: number) {
    const res = await this.prisma.registration.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} registration`;
  }

  async remove(id: number) {
    const res = await this.prisma.registration.delete({
      where: {
        id: id,
      },
    });
    return res;
  }
}
