import { Component, Inject } from '@angular/core';
import { appStore } from '../app.store';
import { Store } from 'redux';
import { AppState } from '../reducers';
import { getUnreadMessagesCount } from '../reducers/ThreadsReducer';

@Component({
  selector: 'chat-nav-bar',
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="https://ng-book.com/2">
             ng-book 2
          </a>
        </div>
        <p class="navbar-text navbar-right">
          <button class="btn btn-primary" type="button">
            Messages <span class="badge">{{ unreadMessagesCount }}</span>
          </button>
        </p>
      </div>
    </nav>
  `
})
export default class ChatNavBarComponent {
  unreadMessagesCount: number;
  constructor(
    @Inject(appStore) private store: Store<AppState>
  ) {
    store.subscribe(() => this.updateState());
    this.updateState();
  }

  updateState() {
    this.unreadMessagesCount = getUnreadMessagesCount(this.store.getState());
  }
}
