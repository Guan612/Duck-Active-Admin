import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  Query,
} from '@nestjs/common';
import { ActiveService } from './active.service';
import {
  CreateActiveDto,
  UpdateActiveDto,
} from './dto/active.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guard/jwt.guard';
import { RoleGuard } from 'src/user/guard/role.guard';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from 'src/user/dto/user.dto';

@Controller('active')
@ApiTags('active')
export class ActiveController {
  constructor(
    private readonly activeService: ActiveService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Responsible, Role.Admin, Role.Teacher)
  @ApiOperation({ summary: '创建活动' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: '创建成功',
    schema: {
      example: {
        id: 3,
        title: '学生心理健康周',
        activitieType: 0,
        content: '关注学生心理健康',
        activitieImgUrl:
          'https://pic.nximg.cn/pic/20221214/10647388_183723517109_4.jpg',
        isOnline: 0,
        activeAddress: '红蓝交界处',
        activitiePeopleNum: 100,
        activitStatus: 0,
        startDate: '2024-12-02T00:00:00.000Z',
        endDate: '2024-12-08T00:00:00.000Z',
        createdAt: '2024-12-15T07:53:00.990Z',
        updatedAt: '2024-12-15T07:53:00.990Z',
      },
    },
  })
  create(@Body() createActiveDto: CreateActiveDto) {
    return this.activeService.create(createActiveDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取所有活动' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '获取成功',
    schema: {
      example: {},
    },
  })
  findAll() {
    return this.activeService.findAll();
  }

  @Get('checkActiveStatus/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '检查活动状态' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '检查成功',
    schema: {
      example: {
        message: '活动状态检查完成',
      },
    },
  })
  async checkActiveStatus(@Param('id') id: string) {
    const res = await this.activeService.findOne(+id);
    const now = new Date(); // 获取当前时间
    if (new Date(res.endDate) < now && res.activitStatus==2) {
      // 检查 startdate 是否在当前时间之前
      await this.activeService.update(res.id, {activitStatus:3});//更新活动状态为已结束
    }
    return {
      message: '活动状态检查完成',
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取单个活动' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '获取成功',
    schema: {
      example: {},
    },
  })
  findOne(@Param('id') id: string) {
    return this.activeService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.Teacher, Role.Responsible)
  @ApiOperation({ summary: '更新活动' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '更新成功',
    schema: {
      example: {},
    },
  })
  update(@Param('id') id: string, @Body() updateActiveDto: UpdateActiveDto) {
    return this.activeService.update(+id, updateActiveDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.Teacher, Role.Responsible)
  @ApiOperation({ summary: '删除活动' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '删除成功',
    schema: {
      example: {},
    },
  })
  remove(@Param('id') id: string) {
    return this.activeService.remove(+id);
  }
}
