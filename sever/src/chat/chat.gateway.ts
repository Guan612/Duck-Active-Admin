import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { JwtAuthGuard } from 'src/user/guard/jwt.guard';

@WebSocketGateway(3001, {
  namespace: '/chat',
  cors: {
    origin: '*', // 允许所有来源
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
})
@UseGuards(JwtAuthGuard)
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('intoChat')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('exitChat')
  hanleMessage() {
    return 'bye';
  }
}
