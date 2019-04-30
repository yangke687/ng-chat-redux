declare var require: any;
import { Store } from 'redux';
import * as moment from 'moment';

import { User } from './models/User';
import { Thread } from './models/Thread';
import { uuid } from './utils/uuid';
import { AppState } from './reducers/index';
import { setCurrentUser } from './actions/UserActions';
import { addMessage, addThread, selectThread } from './actions/ThreadActions';
import { getAllMessages } from './reducers/ThreadsReducer';

const me: User = {
  id: uuid(),
  isClient: true, // <-- notice we're specifying the client as this User
  name: 'Juliet',
  avatarSrc: require('../images/avatars/female-avatar-1.png')
};

const ladycap: User = {
  id: uuid(),
  name: 'Lady Capulet',
  avatarSrc: require('../images/avatars/female-avatar-2.png')
};

const echo: User = {
  id: uuid(),
  name: 'Echo Bot',
  avatarSrc: require('../images/avatars/male-avatar-1.png')
};

const rev: User = {
  id: uuid(),
  name: 'Reverse Bot',
  avatarSrc: require('../images/avatars/female-avatar-4.png')
};

const wait: User = {
  id: uuid(),
  name: 'Waiting Bot',
  avatarSrc: require('../images/avatars/male-avatar-2.png')
};

const tLadycap: Thread = {
  id: 'tLadycap',
  name: ladycap.name,
  avatarSrc: ladycap.avatarSrc,
  messages: []
};

const tEcho: Thread = {
  id: 'tEcho',
  name: echo.name,
  avatarSrc: echo.avatarSrc,
  messages: []
};

const tRev: Thread = {
  id: 'tRev',
  name: rev.name,
  avatarSrc: rev.avatarSrc,
  messages: []
};

const tWait: Thread = {
  id: 'tWait',
  name: wait.name,
  avatarSrc: wait.avatarSrc,
  messages: []
};

export default function ChatExampleData(store: Store<AppState>) {
   // set the current User
   store.dispatch(setCurrentUser(me));

   // create a new thread and add messages
   store.dispatch(addThread(tLadycap));
   store.dispatch(addMessage(tLadycap, {
     author: me,
     sentAt: moment().subtract(45, 'minutes').toDate(),
     text: 'Yet let me weep for such a feeling loss.'
   }));
   store.dispatch(addMessage(tLadycap, {
     author: ladycap,
     sentAt: moment().subtract(20, 'minutes').toDate(),
     text: 'So shall you feel the loss, but not the friend which you weep for.'
   }));

   // create a few more threads
   store.dispatch(addThread(tEcho));
   store.dispatch(addMessage(tEcho, {
     author: echo,
     sentAt: moment().subtract(1, 'minutes').toDate(),
     text: 'I\'ll echo whatever you send me'
   }));

   store.dispatch(addThread(tRev));
   store.dispatch(addMessage(tRev, {
     author: rev,
     sentAt: moment().subtract(3, 'minutes').toDate(),
     text: 'I\'ll reverse whatever you send me'
   }));

   store.dispatch(addThread(tWait));
   store.dispatch(addMessage(tWait, {
     author: wait,
     sentAt: moment().subtract(4, 'minutes').toDate(),
     text: `I\'ll wait however many seconds you send to me before responding.` +
       ` Try sending '3'`
   }));

   // select the first thread
   store.dispatch(selectThread(tLadycap));

   /* tslint:disable */
  let handledMessages = {};

  store.subscribe( () => {
    getAllMessages(store.getState())
      // bots only respond to messages sent by the user, so
      // only keep messages sent by the current user
      .filter(message => message.author.id === me.id)
      .map(message => {

        // This is a bit of a hack and we're stretching the limits of a faux
        // chat app. Every time there is a new message, we only want to keep the
        // new ones. This is a case where some sort of queue would be a better
        // model
        if (handledMessages.hasOwnProperty(message.id)) {
          return;
        }
        handledMessages[message.id] = true;

        switch (message.thread.id) {
          case tEcho.id:
            // echo back the same message to the user
            store.dispatch(addMessage(tEcho, {
              author: echo,
              text: message.text
            }));

            break;
          case tRev.id:
            // echo back the message reveresed to the user
            store.dispatch(addMessage(tRev, {
              author: rev,
              text: message.text.split('').reverse().join('')
            }));

            break;
          case tWait.id:
            let waitTime: number = parseInt(message.text, 10);
            let reply: string;

            if (isNaN(waitTime)) {
              waitTime = 0;
              reply = `I didn\'t understand ${message}. Try sending me a number`;
            } else {
              reply = `I waited ${waitTime} seconds to send you this.`;
            }

            setTimeout(
              () => {
                store.dispatch(addMessage(tWait, {
                  author: wait,
                  text: reply
                }));
              },
              waitTime * 1000);

            break;
          default:
            break;
        }
      });
  });
}
