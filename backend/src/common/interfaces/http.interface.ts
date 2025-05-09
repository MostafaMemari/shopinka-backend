export interface ISendRequest {
    amount: number;
    description: string;
    userId: number;
    user?: {
        email?: string;
        mobile?: string;
    };
}

export interface IVerifyRequest {
    authority: string;
    amount: number;
}