import { Thread } from './Thread';
import { User } from './User';

export interface Message {
  id?: string;
  sentAt: Date;
  isRead?: boolean;
  thread?: Thread;
  author: User;
  text: string;
}
