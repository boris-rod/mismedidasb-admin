import { User } from './user';

export interface Invitation {
  id: number;
  groupId: number;
  userId: number;
  statusId: number;
  status: string;
  createdAt: Date;
  modifiedAt: Date;
  user: User;
  userEmail: string;
}
