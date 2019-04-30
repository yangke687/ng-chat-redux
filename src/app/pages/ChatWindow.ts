import { Component, Inject, ElementRef } from '@angular/core';
import { Store } from 'redux';

import { Thread } from '../models/Thread';
import { User } from '../models/User';
import { AppState } from '../reducers/index';
import { getCurrentThread } from '../reducers/ThreadsReducer';
import { getCurrentUser } from '../reducers/UsersReducer';
import { appStore } from '../app.store';
import { addMessage } from '../actions/ThreadActions';

@Component({
  selector: 'chat-window',
  template: `
    <div class="chat-window-container">
      <div class="chat-window">
        <div class="panel-container">
          <div class="panel panel-default">
            <div class="panel-heading top-bar">
              <div class="panel-title-container">
                <h3 class="panel-title">
                  <span class="glyphicon glyphicon-comment"></span>
                  Chat - {{currentThread.name}}
                </h3>
              </div>
              <div class="panel-buttons-container"  >
                <!-- you could put minimize or close buttons here -->
              </div>
            </div>
            <div class="panel-body msg-container-base">
              <chat-message
                   *ngFor="let message of currentThread.messages"
                   [message]="message">
              </chat-message>
            </div>
            <div class="panel-footer">
              <div class="input-group">
                <input type="text"
                       class="chat-input"
                       placeholder="Write your message here..."
                       (keydown.enter)="onEnter($event)"
                       [(ngModel)]="draftMessage.text" />
                <span class="input-group-btn">
                  <button class="btn-chat"
                     (click)="onEnter($event)"
                     >Send</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export default class ChatWindowComponent {
  currentThread: Thread;
  draftMessage: { text: string };
  currentUser: User;

  constructor(@Inject(appStore) private store: Store<AppState>,
              private el: ElementRef) {
    store.subscribe(() => this.updateState() );
    this.updateState();
    this.draftMessage = { text: '' };
  }

  updateState() {
    const state = this.store.getState();
    this.currentThread = getCurrentThread(state);
    this.currentUser = getCurrentUser(state);
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    if (scrollPane) {
      setTimeout(() => scrollPane.scrollTop = scrollPane.scrollHeight);
    }
  }

  sendMessage(): void {
    this.store.dispatch(addMessage(
      this.currentThread,
      {
        author: this.currentUser,
        isRead: true,
        text: this.draftMessage.text
      }
    ));
    this.draftMessage = { text: '' };
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }
}
