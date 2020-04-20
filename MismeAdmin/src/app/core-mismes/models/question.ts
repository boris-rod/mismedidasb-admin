import { Answer } from './answer';
export interface Question {
    id: number;
    pollId: number;
    pollName: number;
    order: number;
    title: string;
    titleEN: string;
    titleIT: string;
    createdAt: Date;
    modifiedAt: Date;
    answers: Answer[];
}
