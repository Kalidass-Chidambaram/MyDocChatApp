import { Component, OnInit } from '@angular/core';
import { ChatService } from './service/chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [ChatService]
})
export class ChatBoxComponent implements OnInit {

  public messageToSend: string = '';
  public userId: number;
  public connectionType = 'chat';
  public msgArray: any[] = [];


  constructor(private chatServie: ChatService) {
    if (localStorage.getItem("userId") === null) {
      localStorage.setItem('userId', '1');
      this.userId = 1;    
    } else {
      this.userId = 2;    
    }
    this.chatServie.newMessageReceived().subscribe((data)=> {
      this.msgArray.push(data);
      let msgContentDiv = document.getElementById('msg-content-area');
      console.log(msgContentDiv.scrollHeight);
      console.log(msgContentDiv.clientHeight);
      if (msgContentDiv.scrollHeight > msgContentDiv.clientHeight) {
        msgContentDiv.scrollTop = msgContentDiv.scrollHeight - msgContentDiv.clientHeight;
      }
    })
   }

  ngOnInit(): void {
    this.chatServie.joinChat({connectionType: this.connectionType, userId: this.userId});
    let msgContentDiv = document.getElementById('msg-content-area');
    console.log(msgContentDiv.scrollHeight);
    console.log(msgContentDiv.clientHeight);
    if (msgContentDiv.scrollHeight > msgContentDiv.clientHeight) {
      msgContentDiv.scrollTop = msgContentDiv.scrollHeight - msgContentDiv.clientHeight;
    }
  }

  public sendMessage() {
    this.chatServie.sendMessage({userId: this.userId, connectionType: this.connectionType, message: this.messageToSend});
    this.messageToSend = '';
  }
}
