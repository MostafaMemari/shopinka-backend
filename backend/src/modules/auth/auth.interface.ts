export interface IGenerateTokens {
    accessToken: string;
    refreshToken: string;
}

export interface IRefreshToken {
    message?: string
    accessToken: string
}