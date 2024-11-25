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

  @IsOptional()
  @IsString()
  content?: string;
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