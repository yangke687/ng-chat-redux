import { Thread } from '../models/Thread';
import { Action, ActionCreator } from 'redux';
import { Message } from '../models/Message';
import { uuid } from '../utils/uuid';

export const ADD_THREAD = '[Thread] Add';

export interface AddThreadAction extends Action {
  thread: Thread;
}

export const addThread: ActionCreator<AddThreadAction> = (thread: Thread) => ({
  type: ADD_THREAD,
  thread,
});

export const ADD_MESSAGE = '[Thread] Add Message';

export interface AddMessageAction extends Action {
  thread: Thread;
  message: Message;
}

export const addMessage: ActionCreator<AddMessageAction> = (
  thread: Thread,
  messageArgs: Message
): AddMessageAction => {
  const defaults = {
    id: uuid(),
    sendAt: new Date(),
    isRead: false,
    thread,
  };
  const message: Message = Object.assign({}, defaults, messageArgs);

  return {
    type: ADD_MESSAGE,
    thread,
    message,
  };
};

export const SELECT_THREAD = '[Thread] Select';

export interface SelectThreadAction extends Action {
  thread: Thread;
}

export const selectThread: ActionCreator<SelectThreadAction> = (
  thread: Thread
) => ({
  type: SELECT_THREAD,
  thread,
});
