import { Question } from './question';
import { Concept } from './concept';
import { Tip } from './tip';
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
    tips: Tip[];

    nameEN: string;
    descriptionEN: string;
    htmlContentEN: string;
    nameIT: string;
    descriptionIT: string;
    htmlContentIT: string;
}
