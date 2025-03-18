import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(3001, { namespace: '/active', cors: { origin: '*' } })
export class ActiveGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('startActivity')
  handleStartActivity(@MessageBody() data: { id: number }) {
    // 处理活动开始逻辑
    console.log(`活动 ${data.id} 开始`);
    this.server.emit('activityStarted', { id: data.id });
  }
}
