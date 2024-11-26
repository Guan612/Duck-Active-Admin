import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum Role {
  User = 0, // 学生
  Responsible = 1, // 活动负责人
  Teacher = 2, // 教师
  Admin = 3, // 超级管理员
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  loginId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: '密码长度不能低于6位' })
  password: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString({ message: '昵称格式不正确' })
  nickname?: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  loginId: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString({ message: '昵称格式不正确' })
  nickname?: string;

  @IsOptional()
  @IsNumber()
  role?: number;
}
