import { Component, OnInit } from '@angular/core';
import { Message } from '../models/Message';

@Component({
  inputs: ['message'],
  selector: 'chat-message',
  template: `
    <div class="msg-container"
         [ngClass]="{'base-sent': !incoming, 'base-receive': incoming}">
      <div class="avatar"
           *ngIf="!incoming">
        <img src="{{message.author.avatarSrc}}">
      </div>
      <div class="messages"
        [ngClass]="{'msg-sent': !incoming, 'msg-receive': incoming}">
        <p>{{message.text}}</p>
        <p class="time">{{message.sender}} • {{message.sentAt | fromNow}}</p>
      </div>
      <div class="avatar"
           *ngIf="incoming">
        <img src="{{message.author.avatarSrc}}">
      </div>
    </div>
  `
})
export default class ChatMessageComponent implements OnInit {
  message: Message;
  incoming: boolean;

  // init tasks
  // true: received message from others
  ngOnInit(): void {
    this.incoming = !this.message.author.isClient;
  }
}
