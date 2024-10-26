import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum Role {
  User = 0, // 学生
  Teacher = 1, // 老师
  Admin = 2, // 超级管理员
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
