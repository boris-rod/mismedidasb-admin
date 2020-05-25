export interface ContactUs {
    id: number;
    userId: number;
    userEmail: string;
    userName: string;
    subject: string;
    body: string;
    createdAt: Date;
    read: boolean;
    priority: string;
    priorityId: number;
    isAnswered: boolean;
}