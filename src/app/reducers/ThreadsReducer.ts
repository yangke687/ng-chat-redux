import { Thread } from '../models/Thread';
import { Action } from 'redux';
import {
  ADD_THREAD,
  AddThreadAction,
  ADD_MESSAGE,
  AddMessageAction,
  SELECT_THREAD,
  SelectThreadAction
} from '../actions/ThreadActions';

import { createSelector } from 'reselect';

import { Message } from '../models/Message';

export interface ThreadsEntities {
  [id: string]: Thread;
}

export interface ThreadsState {
  ids: string[]; // 会话id的集合
  entities: ThreadsEntities[]; // 会话 (Threads) 集合
  currentThreadId: string;
}

const initState: ThreadsState = {
  ids: [],
  currentThreadId: null,
  entities: [],
};

export const ThreadsReducer = (
  state: ThreadsState = initState,
  action: Action
): ThreadsState => {
  switch (action.type) {
    case ADD_THREAD: {
      const thread = (action as AddThreadAction).thread;
      return {
        ids: [ ...state.ids, thread.id ],
        currentThreadId: state.currentThreadId,
        entities: Object.assign({}, state.entities, {
          [thread.id]: thread
        })
      };
    }
    case ADD_MESSAGE: {
      const thread = (action as AddMessageAction).thread;
      const message = (action as AddMessageAction).message;

      const isRead = message.thread.id === state.currentThreadId ? true : message.isRead;
      const newMessage = Object.assign({}, message, { isRead });

      // grab the old thread from entities
      const oldThread = state.entities[thread.id];

      // create a new thread which has our newMessage
      const newThread = Object.assign({}, oldThread, {
        messages: [ ...oldThread.messages, newMessage ]
      });

      return {
        ids: state.ids,
        currentThreadId: state.currentThreadId,
        entities: Object.assign({}, state.entities, {
          [thread.id]: newThread
        })
      };
    }
    case SELECT_THREAD: {
      const thread = (action as SelectThreadAction).thread;
      const oldThread = state.entities[thread.id];

      // mark as read
      const newMessages = oldThread.messages.map((message) => Object.assign({}, message, { isRead: true }));

      const newThread = Object.assign({}, oldThread, { messages: newMessages });

      return {
        ids: state.ids,
        currentThreadId: thread.id,
        entities: Object.assign({}, state.entities, {
          [thread.id]: newThread
        })
      };
    }
    default:
      return state;
  }
};

export const getThreadsState = (state): ThreadsState => state.threads;

export const getThreadsEntities = createSelector(
  getThreadsState,
  (state: ThreadsState) => state.entities
);

export const getCurrentThread = createSelector(
  getThreadsEntities,
  getThreadsState,
  (entities: ThreadsEntities[], state: ThreadsState) => entities[state.currentThreadId]
);

export const getAllThreads = createSelector(
  getThreadsEntities,
  (entities: ThreadsEntities[]) => Object.keys(entities).map(threadId => entities[threadId])
);

export const getUnreadMessagesCount = createSelector(
  getAllThreads,
  (threads: Thread[]) => threads.reduce(
    (unreadCount: number, thread: Thread) => {
      thread.messages.forEach((message: Message) => {
        if (!message.isRead) {
          unreadCount++;
        }
      });
      return unreadCount;
    }, 0
  )
);

export const getAllMessages = createSelector(
  getAllThreads,
  ( threads: Thread[] ) => threads.reduce(
    (messages, thread) => [ ...messages, ...thread.messages ],
    []
  ).sort((m1, m2) => m1.sentAt - m2.sendAt)
);
