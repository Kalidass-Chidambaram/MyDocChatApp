import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

   private _socket = io('http://localhost:3000');

   public joinChat(data) {
     this._socket.emit('join', data);
   }

   public sendMessage(data) {
    this._socket.emit('message', data);
  }

  public newMessageReceived() {
    let observable = new Observable<{user: string, message:string}>(observer => {
      this._socket.on('new message', (data)=>{
        observer.next(data);
      })
      return () => { this._socket.disconnect();}
    })

    return observable;

  }

}
