/**
 * @author frenzycoder
 * @description Starting point of server
 */
import 'module-alias/register'
import './global';
import {config} from "dotenv";
import {createServer} from 'node:http';
import express, {Express} from 'express';
import { databaseConnection, redisClient } from '@connection';
import { exit } from 'node:process';
import { auth_routes, show_routes } from '@routes';
import cors from 'cors'
config({path:'./.env'}) /// used for load .env file which contains all the required links and env variables

/** 
 * @description Loading env type [development/production] 
 * @var ENV is used as a flag in this code this variable will contain either development or production
*/
const ENV: string = process.env.NODE_ENV ?? "development"; 
/**
 * @description Loading port value based on @var ENV
 */
const PORT:number = ENV === 'development' ? Number(process.env.TEST_PORT ?? 7002) : Number(process.env.PORT ?? 7001);
const expressApp:Express = express(); /// creating express app

const DATABASE_URL:string = ENV === 'development' ? process.env.TEST_DATABASE : process.env.DATABASE;


expressApp.use(express.json()); // 
expressApp.use(express.urlencoded({extended:true}))
expressApp.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}))

/**
 * @description routes
 */
expressApp.use('/api/v1/auth', auth_routes);
expressApp.use('/api/v1/shows', show_routes);

/**
 * Redis Connection listers 
*/
redisClient.on('connect', () => {
    console.log('REDIS STATUS       : CONNECTED')
});

redisClient.on('error', (error:Error) => {
    console.log('Redis connection   : Error');
    console.log(`Message            : ${error.message}`)
});



const startServices = async () => {
   try {
        await databaseConnection({url:DATABASE_URL});
        /**
        * @description created http server passes the express app as an arguments 
        */
        createServer(expressApp).listen(PORT, () => {
            console.log(`Server satus       : Running`);
            console.log(`Mode               : ${ENV}`);
            console.log(`PORT               : ${PORT}`)
        });
   } catch (error) {
        console.log('Error        : ', error) 
        exit(0);
   } 
}

startServices();
