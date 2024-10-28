import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ActiveService } from './active.service';
import { CreateActiveDto, UpdateActiveDto } from './dto/active.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guard/jwt.guard';
import { RoleGuard } from 'src/user/guard/role.guard';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from 'src/user/dto/user.dto';

@Controller('active')
@ApiTags('active')
export class ActiveController {
  constructor(private readonly activeService: ActiveService) {}

  @Post()
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Roles(Role.Admin,Role.Teacher)
  @ApiOperation({ summary: '创建活动' })
  create(@Body() createActiveDto: CreateActiveDto) {
    return this.activeService.create(createActiveDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取所有活动' })
  findAll() {
    return this.activeService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取单个活动' })
  findOne(@Param('id') id: string) {
    return this.activeService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Roles(Role.Admin,Role.Teacher)
  @ApiOperation({ summary: '更新活动' })
  update(@Param('id') id: string, @Body() updateActiveDto: UpdateActiveDto) {
    return this.activeService.update(+id, updateActiveDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Roles(Role.Admin,Role.Teacher)
  @ApiOperation({ summary: '删除活动' })
  remove(@Param('id') id: string) {
    return this.activeService.remove(+id);
  }
}
