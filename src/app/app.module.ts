import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { createStore } from 'redux';
import { rootReducer } from './reducers';

import ChatPage from './pages/ChatPage';
import ChatNavBar from './pages/ChatNavBar';
import ChatThreads from './pages/ChatThreads';
import ChatWindow from './pages/ChatWindow';
import ChatThreadComponent from './components/ChatThread.component';
import ChatMessageComponent from './components/ChatMessage.component';

import { FromNowPipe } from './utils/FromNowPipe';

import { appStore } from './app.store';

function appStoreFactory() {
  return createStore(
    rootReducer
  );
}

@NgModule({
  declarations: [
    AppComponent,
    ChatPage,
    ChatNavBar,
    ChatThreads,
    ChatWindow,
    ChatThreadComponent,
    ChatMessageComponent,
    FromNowPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    { provide: appStore,  useFactory: appStoreFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
