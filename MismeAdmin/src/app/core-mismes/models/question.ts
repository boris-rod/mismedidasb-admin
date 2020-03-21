import { Answer } from './answer';
export interface Question {
    id: number;
    pollId: number;
    order: number;
    title: string;
    createdAt: Date;
    modifiedAt: Date;
    answers: Answer[];
}
