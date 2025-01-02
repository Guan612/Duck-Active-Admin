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
import { CreateActiveDto, UpdateActiveDto } from './dto/active.dto';
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
import { User } from 'src/user/decorator/userInfo.decorator';

@Controller('active')
@ApiTags('active')
export class ActiveController {
  constructor(private readonly activeService: ActiveService) {}

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
    if (new Date(res.endDate) < now && res.activitStatus == 2) {
      // 检查 startdate 是否在当前时间之前
      await this.activeService.update(res.id, { activitStatus: 3 }); //更新活动状态为已结束
    }
    return {
      message: '活动状态检查完成',
    };
  }

  @Get('findByCreatUser')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Responsible, Role.Admin, Role.Teacher)
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取创建者活动' })
  @ApiResponse({
    status: 200,
    description: '获取成功',
    schema: {
      example: [
        {
          id: 5,
          title: '杜比全景声试听会',
          activitieType: 2,
          content:
            '想体验极致的声音震撼吗？杜比全景声（Dolby Atmos）为您带来全新的沉浸式听觉盛宴！无论是电影、音乐，还是游戏，杜比全景声都能以环绕立体声的方式，让声音动态地环绕在您的四周，让您仿佛置身其中。',
          activitieImgUrl:
            'http://localhost:3000/upload\\img\\108881143bc9e3d75.jpg',
          isOnline: 0,
          activeAddress: '国腾园杜比剧场',
          activitiePeopleNum: 300,
          remainingNum: 0,
          activitStatus: 0,
          createdPeople: 1,
          startDate: '2024-12-25T02:58:48.060Z',
          endDate: '2024-12-31T02:58:48.060Z',
          createdAt: '2024-12-25T03:02:27.448Z',
          updatedAt: '2024-12-25T03:02:27.448Z',
        },
      ],
    },
  })
  async findActiveByCreatUser(@User('id') userId: string) {
    return this.activeService.findByCreatUser(+userId);
  }

  @Get('findByStatus')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取活动状态' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '获取成功',
    schema: {},
  })
  async findActiveByStatus(@Query('status') status: string) {
    const statusArray = status.split(',').map((s) => +s.trim()); // 将字符串转换为数字数组
    return this.activeService.findByStatus(statusArray);
  }

  @Get('findByTime')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取活动时间' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '获取成功',
    schema: {},
  })
  async findActiveByTime(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.activeService.findByTime(startDate, endDate);
  }

  @Get('newactive')
  @ApiOperation({ summary: '获取最新活动' })
  @ApiResponse({
    status: 200,
    description: '获取成功',
    schema: {},
  })
  async findHotActive() {
    return this.activeService.findNewActive();
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
