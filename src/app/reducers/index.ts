import { UsersState, UsersReducer } from './UsersReducer';
import { ThreadsState, ThreadsReducer } from './ThreadsReducer';
import {  } from '../actions/ThreadActions';
import { Reducer, combineReducers } from 'redux';

export interface AppState {
  users: UsersState;
  threads: ThreadsState;
}

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  users: UsersReducer,
  threads: ThreadsReducer
 });
