export interface Answer {
    id: number;
    questionId: number;
    order: number;
    weight: number;
    title: string;
    createdAt: Date;
    modifiedAt: Date;
}