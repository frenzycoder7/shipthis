class ServerError extends Error {
    statusCode: number;
    message: string;
    data: any
}