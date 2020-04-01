import { Question } from './question';
import { Concept } from './concept';
export interface Poll {
    id: number;
    name: string;
    description: string;
    htmlContent: string;
    order: number;
    createdAt: Date;
    modifiedAt: Date;
    isReadOnly: boolean;
    conceptId: number;
    concept: Concept;
    questions: Question[];
}
