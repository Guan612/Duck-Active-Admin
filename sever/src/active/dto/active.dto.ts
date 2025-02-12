import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { Transform } from 'class-transformer';

export class CreateActiveDto {
  @ApiProperty({
    description: '活动标题',
    example: '活动标题1',
  })
  @IsNotEmpty({ message: '活动标题不能为空' })
  @IsString()
  title: string;

  @ApiProperty({
    description: '活动详情',
    example: '活动详情1',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description: '活动图片',
    example: 'http://www.baidu.com',
  })
  @IsOptional()
  @IsString()
  activitieImgUrl?: string;

  @ApiProperty({
    description: '活动类型',
    example: 0,
  })
  @IsNotEmpty()
  @IsInt()
  activitieType: ActivitieType;

  @ApiProperty({
    description: '线上或线下',
    example: 0,
  })
  @IsNotEmpty()
  @IsInt()
  isOnline: isOnline;

  @ApiProperty({
    description: '活动地点',
    example: '活动地点1',
  })
  @IsOptional()
  @IsString()
  activeAddress?: string;

  @ApiProperty({
    description: '活动人数',
    example: 10,
  })
  @IsNotEmpty()
  @IsInt()
  activitiePeopleNum: number;

  @ApiProperty({
    description: '创建人id',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  createdPeople: number;

  @ApiProperty({
    description: '活动分数',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  point: number;

  @ApiProperty({
    description: '活动开始时间',
    example: '2024-12-06T16:00:00.000Z',
  })
  @IsNotEmpty({ message: '活动开始时间不能为空' })
  @IsDate({ message: '活动开始时间格式不正确' })
  @Transform(({ value }) => new Date(value))
  startDate: Date;

  @ApiProperty({
    description: '活动结束时间',
    example: '2024-12-08T16:00:00.000Z',
  })
  @IsNotEmpty({ message: '活动结束时间不能为空' })
  @IsDate({ message: '活动结束时间格式不正确' })
  @Transform(({ value }) => new Date(value))
  endDate: Date;
}

export class UpdateActiveDto {
  @ApiProperty({
    description: '活动标题',
    example: '活动标题1',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: '活动详情',
    example: '活动详情1',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description: '活动图片',
    example: 'http://www.baidu.com',
  })
  @IsOptional()
  @IsString()
  activitieImgUrl?: string;

  @ApiProperty({
    description: '活动地点',
    example: '活动地点1',
  })
  @IsOptional()
  @IsString()
  activeAddress?: string;

  @ApiProperty({
    description: '活动人数',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  activitiePeopleNum?: number;

  @ApiProperty({
    description: '活动状态',
    example: 0,
  })
  @IsOptional()
  @IsInt()
  activitStatus?: ActivitieStatus;

  @ApiProperty({
    description: '活动报名人数',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  remainingNum?: number;

  @ApiProperty({
    description: '活动分数',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  point?: number;
}

export enum ActivitieType {
  //0：博学 1：笃行 2：尽美 3：明德
  通用 = 0,
  博学 = 1,
  笃行 = 2,
  尽美 = 3,
  明德 = 4,
}

export enum isOnline {
  //0：未上线 1：已上线
  线上 = 0,
  线下 = 1,
}

export enum ActivitieStatus {
  //0：创建活动 1：审核活动 2：开始报名 3：报名结束 4：活动结束
  创建活动 = 0,
  审核活动 = 1,
  审核未通过 = 6,
  开始报名 = 2,
  报名结束 = 3,
  活动开始 = 4,
  活动结束 = 5,
}
