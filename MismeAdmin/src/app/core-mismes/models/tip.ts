export interface Tip {
    id: number;
    pollId: number;
    content: string;
    contentEN: string;
    contentIT: string;
    isActive: boolean;
    tipPositionString: string;
    tipPosition: number;
    createdAt: Date;
    modifiedAt: Date;
}
