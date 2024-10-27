import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const res = await this.prisma.user.create({
      data: createUserDto,
    });

    return {
      loginId: res.loginId,
    };
  }

  async findAll() {
    const res = await this.prisma.user.findMany();
    return res;
  }

  async findByLoginId(loginId: string) {
    const res = await this.prisma.user.findUnique({
      where: {
        loginId: loginId,
      },
    });
    return res;
  }

  async findOne(id: number) {
    const res = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const res = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
    return res;
  }

  async remove(id: number) {
    const res = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    return res;
  }
}
