import { Question } from './question';
export interface Poll {
    id: number;
    name: string;
    description: string;
    order: number;
    createdAt: Date;
    modifiedAt: Date;
    isReadOnly: boolean;
    questions: Question[];
}
