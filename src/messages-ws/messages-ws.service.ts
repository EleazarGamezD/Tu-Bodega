import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';

import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';


interface ConnectedClients{
    [id:string] : {
        socket: Socket,
        user: User,
        
    }
}

@Injectable()
export class MessagesWsService {

    private connectedClients: ConnectedClients = {}

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

   async registerClient (client : Socket, userId:string){

        const user = await this.userRepository.findOneBy({id: userId})
        if  (!user ) throw new error('user not found')
        if  (!user.isActive ) throw new error('user not active')
        this.checkUserConnection(user)
        this.connectedClients[client.id] = {socket:client, user: user}
    }
    removeClient (clientId: string){
        delete this.connectedClients[clientId]
    }
    getConnectedClients(): string[]{
     console.log(this.connectedClients)
    return Object.keys(this.connectedClients)  
    }
    getUserFullNAmeBySocketId(sockedId: string){

        return this.connectedClients[sockedId].user.fullName 
    }

    private checkUserConnection(user:User){
    for (const clientId of Object.keys(this.connectedClients))    {
    const connectedClient = this.connectedClients[clientId]
    if (connectedClient.user.id === user.id ){
        connectedClient.socket.disconnect()
        break
    }
   }
  }
}
