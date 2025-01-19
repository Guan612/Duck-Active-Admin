import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IntegralService } from './integral.service';
import { CreateIntegralDto } from './dto/integral.dto';

@Controller('integral')
export class IntegralController {
  constructor(private readonly integralService: IntegralService) {}

  @Post()
  create(@Body() createIntegralDto: CreateIntegralDto) {
    return this.integralService.create(createIntegralDto);
  }

  @Get()
  findAll() {
    return this.integralService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.integralService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntegralDto) {
    return this.integralService.update(+id, updateIntegralDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.integralService.remove(+id);
  }
}
