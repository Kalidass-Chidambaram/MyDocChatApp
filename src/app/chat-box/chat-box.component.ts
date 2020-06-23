import { Component, OnInit } from '@angular/core';
import { ChatService } from './service/chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [ChatService]
})
export class ChatBoxComponent implements OnInit {



  constructor(private chatServie: ChatService) { }

  ngOnInit(): void {
    let msgContentDiv = document.getElementById('msg-content-area');
    console.log(msgContentDiv.scrollHeight);
    console.log(msgContentDiv.clientHeight);
    if (msgContentDiv.scrollHeight > msgContentDiv.clientHeight) {
      msgContentDiv.scrollTop = msgContentDiv.scrollHeight - msgContentDiv.clientHeight;
    }
  }

}
