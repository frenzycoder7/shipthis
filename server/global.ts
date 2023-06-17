import { IUser } from '@interfaces';
import express from 'express';

declare global {
    namespace Express {
        interface Request {
            user: IUser,
            limit: number,
            skip: number,
            searchQuery: any,
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            DATABASE: string;
            TEST_PORT: string;
            TEST_DATABASE: string;
            NODE_ENV: string;
        }
    }

}


