export interface Answer {
  id: number;
  questionId: number;
  order: number;
  weight: number;
  title: string;
  titleEN: string;
  titleIT: string;
  createdAt: Date;
  modifiedAt: Date;
  pollName: string;
}
