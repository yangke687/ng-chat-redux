import { Component, Inject } from '@angular/core';
import { Store } from 'redux';

import { Thread } from '../models/Thread';
import { appStore } from '../app.store';
import { AppState } from '../reducers';
import { getAllThreads, getCurrentThread } from '../reducers/ThreadsReducer';
import { selectThread } from '../actions/ThreadActions';

@Component({
  selector: 'chat-threads',
  template: `
    <div class="row">
      <div class="conversation-wrap">
        <chat-thread
             *ngFor="let thread of threads"
             [thread]="thread"
             [selected]="thread.id === currentThreadId"
             (onThreadSelected)="handleThreadClicked($event)">
        </chat-thread>
      </div>
    </div>
  `
})
export default class ChatThreadsComponent {
  threads: Thread[];
  currentThreadId: string;

  constructor(
    @Inject(appStore) private store: Store<AppState>
  ) {
    console.log(store.getState());
    this.updateState();
    store.subscribe(() => this.updateState());
  }

  updateState() {
    const state = this.store.getState();
    this.threads = getAllThreads(state);
    this.currentThreadId = getCurrentThread(state).id;
  }

  handleThreadClicked(thread: Thread) {
    this.store.dispatch(selectThread(thread));
  }
}
