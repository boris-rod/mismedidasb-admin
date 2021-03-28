import { Group } from './group';
import { User } from './user';
import { Eat } from './eat';

export interface Menu {
  id: number;
  name: string;
  description: string;
  active: boolean;
  groupId: number;
  group: Group;
  createdById: number;
  createdBY: User;
  createdAt: Date;
  modifiedAt: Date;
  eats: Eat[];

}
