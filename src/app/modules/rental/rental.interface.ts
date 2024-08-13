export interface IRental {
    userId: string;
    bikeId: string;
    startTime: Date;
    returnTime?: Date | null;
    totalCost: number;
    isReturned?: boolean;
}
