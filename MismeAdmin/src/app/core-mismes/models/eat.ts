import { EatDish } from './eatDish';
import { EatCompoundDish } from './eatCompoundDish';

export interface Eat {
  id: number;
  eatTypeId: number;
  eatType: string;
  isBalanced: boolean;
  createdAt: Date;
  modifiedAt: Date;
  eatDishResponse: EatDish[];
  eatCompoundDishResponse: EatCompoundDish[];
}
