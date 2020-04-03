export interface Tip {
    id: number;
    pollId: number;
    content: string;
    isActive: boolean;
    tipPositionString: string;
    tipPosition: number;
    createdAt: Date;
    modifiedAt: Date;
}
