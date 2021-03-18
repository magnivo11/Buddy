import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'; 
@Injectable({
  providedIn: 'root'
})

//this file's purpose is to connect the server through socket io (web socket)

export class RealtimeService {

  currentCounter = this.socket.fromEvent<Number>('count'); 
  adminMessage=this.socket.fromEvent<String>('message');

  sendMessage(message:String){
    this.socket.emit('message',message)
  }

  constructor(private socket : Socket) { }
}
