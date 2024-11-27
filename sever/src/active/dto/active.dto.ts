import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActiveDto {
  @ApiProperty({
    description: '活动标题',
    example: '活动标题1'
  })
  @IsNotEmpty({message: '活动标题不能为空'})
  @IsString()
  title: string;

  @ApiProperty({
    description: '活动类型',
    example: 0
  })
  @IsNotEmpty()
  @IsInt()
  activitieType: ActivitieType;

  @ApiProperty({
    description:'线上或线下',
    example: 0
  })
  @IsNotEmpty()
  @IsInt()
  isOnline: isOnline;

  @ApiProperty({
    description:'活动状态',
    example: 0
  })
  @IsNotEmpty()
  @IsInt()
  activitStatus: ActivitieStatus;

  @ApiProperty({
    description: '活动开始时间',
    example: '2022-01-01 00:00:00'
  })
  @IsNotEmpty({message: '活动开始时间不能为空'})
  @IsDate({message: '活动开始时间格式不正确'})
  startDate: Date;

  @ApiProperty({
    description: '活动结束时间',
    example: '2022-01-02 00:00:00'
  })
  @IsNotEmpty({message: '活动结束时间不能为空'})
  @IsDate({message: '活动结束时间格式不正确'})
  endDate: Date;
}

export class CreateActivitieDetailDto{
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  activitieImgUrl:string;
}

export class UpdateActiveDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsString()
  content?: string;
}

export enum ActivitieType {
  //0：博学 1：笃行 2：尽美 3：明德
  通用 = 0,
  博学 = 1,
  笃行 = 2,
  尽美 = 3,
  明德 = 4
}

export enum isOnline {
  //0：未上线 1：已上线
  线上 = 0,
  线下 = 1
}

export enum ActivitieStatus {
  //0：创建活动 1：审核活动 2：开始报名 3：报名结束 4：活动结束
  创建活动 = 0,
  审核活动 = 1,
  开始报名 = 2,
  报名结束 = 3,
  活动结束 = 4
}