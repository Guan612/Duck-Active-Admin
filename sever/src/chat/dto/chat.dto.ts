import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

// 消息类型枚举
export enum MessageType {
  TEXT = 0, // 文字
  IMAGE = 1, // 图片
  VIDEO = 2, // 视频
}

export class createChatContexDto {
  @ApiProperty({
    description: '消息ID',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: '聊天室ID',
    example: 1,
  })
  @IsInt()
  chatroomId: number;

  @ApiProperty({
    description: '用户ID',
    example: 1,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: '用户昵称',
    example: 'John Doe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: '消息内容',
    example: 'Hello, World!',
  })
  @IsString()
  context: string;

  @ApiProperty({
    description: '消息类型',
    example: 0,
    enum: MessageType,
  })
  @IsEnum(MessageType)
  messageType: MessageType;

  @ApiProperty({
    description: '消息状态',
    example: 0,
  })
  @IsInt()
  status: number;

  @ApiProperty({
    description: '消息创建时间',
    example: '2025-09-24T10:00:00Z',
  })
  @IsDateString()
  createdAt: string;

  @ApiProperty({
    description: '消息更新时间',
    example: '2025-09-24T10:00:00Z',
  })
  @IsDateString()
  updatedAt: string;
}
