import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateChatroomDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '聊天室id',
    example: 1,
  })
  activeId: number;
}
