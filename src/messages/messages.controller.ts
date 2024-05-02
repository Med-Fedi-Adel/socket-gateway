import { Controller, Get } from '@nestjs/common';
import { Message } from './message.entity';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get('')
  getAllMessages(): Promise<Message[]> {
    return this.messagesService.getAllMessages();
  }
}
