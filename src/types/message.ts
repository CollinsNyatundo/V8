export interface Message {
  id: string;
  from: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
}