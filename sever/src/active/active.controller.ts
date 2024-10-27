import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActiveService } from './active.service';
import { CreateActiveDto } from './dto/active.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('active')
@ApiTags('active')
export class ActiveController {
  constructor(private readonly activeService: ActiveService) {}

  @Post()
  @ApiOperation({ summary: '创建活动' })
  create(@Body() createActiveDto: CreateActiveDto) {
    return this.activeService.create(createActiveDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有活动' })
  findAll() {
    return this.activeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个活动' })
  findOne(@Param('id') id: string) {
    return this.activeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新活动' })
  update(@Param('id') id: string, @Body() updateActiveDto: any) {
    return this.activeService.update(+id, updateActiveDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除活动' })
  remove(@Param('id') id: string) {
    return this.activeService.remove(+id);
  }
}
