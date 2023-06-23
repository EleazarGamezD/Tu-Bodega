import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';


@WebSocketGateway({cors:true})

export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss:Server;
  constructor  (
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService : JwtService
    ) {}


  
  async handleConnection(client: Socket ) {
    const token = client.handshake.headers.authentication as string
    let payload: JwtPayload
    try{
      payload = this.jwtService.verify(token)
      await this.messagesWsService.registerClient( client, payload.id )
    }
    catch(error){
      client.disconnect()
      return
    }
    // console.log ({payload})
    this.wss.emit('clientes-updated',this.messagesWsService.getConnectedClients())
    // console.log( {conectados: this.messagesWsService.getConnectedClients()})
    // console.log(client)
  }
  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient( client.id)
    this.wss.emit('clientes-updated',this.messagesWsService.getConnectedClients())
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto){
        console.log(client.id, payload, this.messagesWsService.getUserFullNAmeBySocketId)

      //!emitir unicamente al cliente
      // client.emit('message-from-server',{
      // fulName:'soy yo',
      // message: payload.message || 'no - message'})

      //emitir a todos Menos al cliente inicial
      // client.broadcast.emit('message-from-server',{
      // fulName:'soy yo',
      // message: payload.message || 'no - message'})

      //emitir a todos incluyendo al cliente inicial 
      this.wss.emit('message-from-server',{
      fullName:this.messagesWsService.getUserFullNAmeBySocketId(client.id),
      message: payload.message || 'no-message'})
    }
}
