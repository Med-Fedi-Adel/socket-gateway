import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDTO } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async createMessage(message: CreateMessageDTO): Promise<Message> {
    const newMessage = await this.messageRepository.save(message);
    return newMessage;
  }

  async getAllMessages(): Promise<Message[]> {
    const messages = await this.messageRepository.find();
    return messages;
  }
}
