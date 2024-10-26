import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const res = await this.prisma.user.create({
      data: createUserDto,
    });

    return res
  }

  findAll() {
    return `This action returns all user`;
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

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
