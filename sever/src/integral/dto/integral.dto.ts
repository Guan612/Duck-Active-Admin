import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateIntegralDto {
  @IsNotEmpty()
  @IsNumber()
  userid: number;
}

export class UpdateActiveDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: '博学分数',
    example: 2,
  })
  learnedPoints?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: '笃行分数',
    example: 2,
  })
  actionPoints?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: '尽美分数',
    example: 2,
  })
  beautyPoints?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: '明德分数',
    example: 2,
  })
  moralPoints?: number;
}
