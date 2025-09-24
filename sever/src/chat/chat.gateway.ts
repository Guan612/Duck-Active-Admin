import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { JwtAuthGuard } from 'src/user/guard/jwt.guard';
import { ChatService } from './chat.service';
import { createChatContexDto } from './dto/chat.dto';

@WebSocketGateway(3001, { namespace: '/chat', cors: { origin: '*' } })
@UseGuards(JwtAuthGuard)
export class ChatGateway {
  constructor(private chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('intoChat')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('sendContext')
  async HandleMessage(client: any, payload: createChatContexDto) {
    const res = await this.chatService.crate(payload);
    return res;
  }

  @SubscribeMessage('exitChat')
  hanleMessage() {
    return 'bye';
  }
}
