import { OnModuleInit } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { AppModule } from 'src/app.module';
import { CreateMessageDTO } from 'src/messages/dto/create-message.dto';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({
  cors: { origin: ['http://localhost:3000'] },
})
export class MyGateway implements OnModuleInit {
  constructor(private messagesService: MessagesService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() data: CreateMessageDTO) {
    console.log(data);

    const newMessage = await this.messagesService.createMessage(data);
    console.log(newMessage);

    this.server.emit('onMessage', {
      msg: 'New Message',
      content: newMessage,
    });
  }
}
