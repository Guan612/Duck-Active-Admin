import { Injectable } from '@nestjs/common';
import { ActiveDto } from './dto/active.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ActiveService {
  constructor(private prisma: PrismaService) {}
  create(createActiveDto: ActiveDto) {
    return 'This action adds a new active';
  }

  findAll() {
    return `This action returns all active`;
  }

  findOne(id: number) {
    return `This action returns a #${id} active`;
  }

  update(id: number, updateActiveDto) {
    return `This action updates a #${id} active`;
  }

  remove(id: number) {
    return `This action removes a #${id} active`;
  }
}
