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
import { IntegralService } from './integral.service';
import { CreateIntegralDto } from './dto/integral.dto';
import { User } from 'src/user/decorator/userInfo.decorator';
import { JwtAuthGuard } from 'src/user/guard/jwt.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleGuard } from 'src/user/guard/role.guard';
import { Role } from 'src/user/dto/user.dto';
import { Roles } from 'src/user/decorator/roles.decorator';

@Controller('integral')
@ApiTags('integral')
export class IntegralController {
  constructor(private readonly integralService: IntegralService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '创建积分' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '创建积分成功',
    schema: {},
  })
  create(@User('id') userid: string) {
    return this.integralService.create({ userid: +userid });
  }

  @Post('addpoint/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.Responsible, Role.Teacher)
  @ApiOperation({ summary: '给活动参与者加分' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '加分成功',
    schema: {},
  })
  async addActivityPoints(@Param('id') activityId: string) {
    return this.integralService.addActivityPoints(+activityId);
  }

  @Get('findByUser')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '查找用户积分' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '查找用户积分成功',
    schema: {},
  })
  findByuser(@User('id') userid: string) {
    return this.integralService.findOne(+userid);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.Responsible, Role.Teacher)
  @ApiOperation({ summary: '查询所有用户积分' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '查询成功',
    schema: {},
  })
  findAll() {
    return this.integralService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: '更新分数' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '更新分数成功',
    schema: {},
  })
  update(@Param('id') id: string, @Body() updateIntegralDto) {
    return this.integralService.update(+id, updateIntegralDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除分数' })
  remove(@Param('id') id: string) {
    return this.integralService.remove(+id);
  }
}
