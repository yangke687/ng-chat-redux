import { Component } from '@angular/core';
@Component({
  selector: 'chat-page',
  template: `
    <div>
      <chat-nav-bar></chat-nav-bar>
      <div class="container">
        <chat-threads></chat-threads>
      </div>
      <chat-window></chat-window>
    </div>
  `
})
export default class ChatPageComponent {}
