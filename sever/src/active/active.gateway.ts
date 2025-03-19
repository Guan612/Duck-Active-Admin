import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, { namespace: '/active', cors: { origin: '*' } })
export class ActiveGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('startActivity')
  handleStartActivity(@MessageBody() data, client: Socket) {
    this.server.emit('startActivity', data);
  }
}
