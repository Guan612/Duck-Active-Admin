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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guard/jwt.guard';
import { RoleGuard } from 'src/user/guard/role.guard';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from 'src/user/dto/user.dto';

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
      example:{}
    },
  })
  create(@Body() createActiveDto: CreateActiveDto) {
    return this.activeService.create(createActiveDto);
  }

  @Post('join')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: ' 是否加入活动' })
  join(@Body() joinActiveDto: any) {
    return this.activeService.join(joinActiveDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取所有活动' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '获取成功',
    schema: {
      example:{}
    },
  })
  findAll() {
    return this.activeService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取单个活动' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: '获取成功',
    schema: {
      example:{}
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
      example:{}
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
      example:{}
    },
  })
  remove(@Param('id') id: string) {
    return this.activeService.remove(+id);
  }
}
