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

  @Post('join')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: ' 是否加入活动' })
  @ApiBearerAuth()
  async join(@Body('activeId') activeId: string, @User('id') userId: string) {
    const isJoin = await this.activeService.findIsJonin(+activeId, +userId);
    if (isJoin) {
      throw new HttpException('已加入活动', 403);
    }
    return this.activeService.joinActive(+activeId, +userId);
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

  @Get('isJoin')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取用户是否加入活动' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '获取成功',
    schema: {
      example: {},
    },
  })
  findIsJoin(@Query('activeId') activeId: string, @User('id') userId: string) {
    return this.activeService.findIsJonin(+activeId, +userId);
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
