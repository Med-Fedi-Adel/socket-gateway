import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  providers: [MyGateway],
  imports: [MessagesModule],
})
export class GatewayModule {}
