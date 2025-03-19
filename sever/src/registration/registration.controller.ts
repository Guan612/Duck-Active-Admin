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
import { RegistrationService } from './registration.service';
import {
  CreateRegistrationDto,
  UpdateRegistrationDto,
} from './dto/registration.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/user/decorator/userInfo.decorator';
import { JwtAuthGuard } from 'src/user/guard/jwt.guard';
import { ActiveService } from 'src/active/active.service';
import { RoleGuard } from 'src/user/guard/role.guard';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from 'src/user/dto/user.dto';

@Controller('registration')
@ApiTags('registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly activeService: ActiveService,
  ) {}

  @Post('join')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '加入活动' })
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        activeId: {
          type: 'number',
          description: '活动的 ID',
          example: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '报名成功',
    schema: {
      example: { id: 5, userId: 2, activitieId: 1, status: 0 },
    },
  })
  @ApiResponse({
    status: 403,
    description: '已报名',
    schema: {
      example: {
        statusCode: 403,
        message: '已加入活动',
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: '活动不是报名状态',
    schema: {
      example: {
        statusCode: 403,
        message: '活动不是报名状态',
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: '活动人数已满',
    schema: {
      example: {
        statusCode: 403,
        message: '活动人数已满',
      },
    },
  })
  async join(@Body('activeId') activeId: number, @User('id') userId: string) {
    const activeInfo = await this.activeService.findOne(activeId);
    //判断活动是否是报名时间
    const now = new Date();
    if (activeInfo.startDate > now || activeInfo.endDate < now) {
      throw new HttpException('活动不是报名时间', 403);
    }
    //判断活动是否是报名状态
    if (activeInfo.activitStatus !== 2) {
      throw new HttpException('活动不是报名状态', 403);
    }
    //判断活动人数是否已满
    if (activeInfo.remainingNum >= activeInfo.activitiePeopleNum) {
      throw new HttpException('活动人数已满', 403);
    }
    // 判断该用户是否已经报名
    const isJoin = await this.registrationService.findIsJonin(
      +activeId,
      +userId,
    );
    if (isJoin) {
      throw new HttpException('已加入活动', 403);
    } else {
      //修改活动剩余人数
      await this.activeService.update(activeId, {
        remainingNum: activeInfo.remainingNum + 1,
      });
      //判断是否是最后一个报名的人
      if (activeInfo.remainingNum + 1 === activeInfo.activitiePeopleNum) {
        await this.activeService.update(activeId, { activitStatus: 3 });
      }
      return this.registrationService.joinActive(+activeId, +userId);
    }
  }

  @Get('isJoin')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取用户是否加入活动' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '获取成功',
    schema: {
      example: true,
    },
  })
  findIsJoin(@Query('activeId') activeId: string, @User('id') userId: string) {
    return this.registrationService.findIsJonin(+activeId, +userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.Teacher, Role.Responsible)
  @ApiOperation({ summary: '获取所有报名信息' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '获取成功',
    schema: {},
  })
  findAll() {
    return this.registrationService.findAll();
  }

  @Get('findByActiveId/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.Teacher, Role.Responsible)
  @ApiOperation({ summary: '查找活动id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '获取成功',
    schema: {
      example: {},
    },
  })
  findByActiveId(@Param('id') id: string) {
    return this.registrationService.findByActiveId(+id);
  }

  @Get('myactive')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取我的活动' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '获取成功',
    schema: {
      example: {},
    },
  })
  findMyActive(@User('id') userId: string) {
    return this.registrationService.findMyAddActive(+userId);
  }

  @Get('signInActive/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '签到活动' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '签到成功',
    schema: {
      example: {},
    },
  })
  async signInActive(@Param('id') id: string) {
    return this.registrationService.signInActive(+id);
  }
}
