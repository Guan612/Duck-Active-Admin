import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActiveDto {
  @IsNotEmpty({message: '活动标题不能为空'})
  @IsString()
  title: string;

  @IsNotEmpty({message: '活动开始时间不能为空'})
  @IsDate({message: '活动开始时间格式不正确'})
  startDate: Date;

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