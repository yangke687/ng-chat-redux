import { User } from '../models/User';
import { Action, ActionCreator } from 'redux';

export const SET_CURRENT_USER = `[User] Set Current`;

export interface SetCurrentUserAction extends Action {
  user: User;
}

export const setCurrentUser: ActionCreator<SetCurrentUserAction> = (user: User) => ({
  type: SET_CURRENT_USER,
  user
});
