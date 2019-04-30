import { Component, Inject } from '@angular/core';
import { Store } from 'redux';

import { appStore } from './app.store';
import { AppState } from './reducers/index';
import ChatExampleData from './ChatExampleData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-chat-redux';
  constructor(
    @Inject(appStore) private store: Store<AppState>
  ) {
    ChatExampleData(store);
  }
}
