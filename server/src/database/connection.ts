import { IDatabaseOptions } from "@interfaces";
import {connect, connection, set} from 'mongoose';
import Redis from 'ioredis'

export const redisClient: Redis = new Redis();

export const databaseConnection = async (options: IDatabaseOptions) => {
    
    connection.on('open', () => {
        console.log('Database status    : Connected')
        console.log('Database Name      : ' + connection.name)
    });

    connection.on('error', (error:Error) => {
        console.log('Database status    : Error')
        console.log('Error Message      : ' + error.message)
    });
    set('allowDiskUse', true);
    set('strictQuery', true);
    await connect(options.url);
}
