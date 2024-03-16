export interface ServerError {
    error: {
        message: string;
        status: number;
        name: string;
    };
}