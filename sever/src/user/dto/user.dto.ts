import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: '用户的用户名',
    example: 'snmqwq',
  })
  @IsNotEmpty()
  @IsString()
  loginId: string;

  @ApiProperty({
    description: '用户的密码',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: '密码长度不能低于6位' })
  password: string;

  @ApiProperty({
    description: '用户的邮箱',
    example: 'snmqwq@love.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: '用户的昵称',
    example: '尚凝梦',
  })
  @IsOptional()
  @IsString({ message: '昵称格式不正确' })
  nickname?: string;
}

export class LoginUserDto {
  @ApiProperty({
    description: '用户的用户名',
    example: 'snmqwq',
  })
  @IsNotEmpty()
  @IsString()
  loginId: string;

  @ApiProperty({
    description: '用户的密码',
    example: '123456',
  })
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
  role?: Role;
}
