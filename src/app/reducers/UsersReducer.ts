import { User } from '../models/User';
import { Action } from 'redux';
import { SET_CURRENT_USER, SetCurrentUserAction } from '../actions/UserActions';

export interface UsersState {
  currentUser: User;
}

const initState: UsersState = {
  currentUser: null,
};

export const UsersReducer = (
  state: UsersState = initState,
  action: Action
): UsersState => {
  switch (action.type) {
    case SET_CURRENT_USER:
      const user: User = (action as SetCurrentUserAction).user;
      return {
        currentUser: user,
      };
    default:
      return state;
  }
};

import { AppState } from './index';

export const getUsersState = (state: AppState): UsersState => state.users;

import { createSelector } from 'reselect';

export const getCurrentUser = createSelector(
  getUsersState,
  ( state: UsersState ) => state.currentUser
);
