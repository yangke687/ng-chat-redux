import { Component, EventEmitter } from '@angular/core';
import { Thread } from '../models/Thread';

@Component({
  selector: 'chat-thread',
  inputs: ['thread', 'selected'],
  outputs: ['onThreadSelected'],
  template: `
    <div class="media conversation">
      <div class="pull-left">
        <img class="media-object avatar" src="{{thread.avatarSrc}}" />
      </div>
      <div class="media-body">
        <h5 class="media-heading contact-name">{{thread.name}}
          <span *ngIf="selected">&bull;</span>
        </h5>
        <small class="message-preview">
          {{thread.messages[thread.messages.length - 1].text}}
        </small>
      </div>
      <a (click)="clicked($event)" class="div-link">Select</a>
    </div>
  `
})
export default class ChatThreadComponent {
  thread: Thread;
  selected: boolean;
  onThreadSelected: EventEmitter<Thread>;

  constructor() {
    this.onThreadSelected = new EventEmitter<Thread>();
  }

  clicked(event: any): void {
    this.onThreadSelected.emit(this.thread);
    event.preventDefault();
  }
}
