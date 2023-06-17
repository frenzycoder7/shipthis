import { redisClient } from "@connection";
import { ITokenBody, IUser } from "@interfaces";
import { show_structure } from "@models";
import { getUser } from "@services";
import { verifyToken } from "@utils";
import { NextFunction, Request, Response } from "express";

export const checkrequiredBody = (keys:string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let errorKeys: string[] = [];
        try {
            keys.forEach((e) => {
                if(req.body[e] == undefined) {
                    errorKeys.push(e);
                }
            });

            if(errorKeys.length > 0) throw Error(`Required body keys are missing: ${errorKeys.join(', ')}`)
            else next();
        } catch (error) {
            res.status(400).json({message:error.message, status:'error'})
        } 
    }
}


export const filterKeysFromObjects = (object: any) => {
    let keys: string[] = []
    for (const key in object) {
        if(object[key].required) keys.push(key);
    } 
    return keys;
}

export const checkrequiredHeaders = (keys:string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let errorKeys: string[] = [];
        try {
            keys.forEach((e) => {
                if(req.headers[e] == undefined) {
                    errorKeys.push(e);
                }
            });

            if(errorKeys.length > 0) throw Error(`Required header keys are missing: ${errorKeys.join(', ')}`)
            else next();
        } catch (error) {
            res.status(400).json({message:error.message, status:'error'})
        } 
    }
}


export const authenticateUser = (refreshRedis: boolean = false) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token = req.headers.authorization;
            if(token == undefined) throw Error('Token is missing in headers');

            let decoded : ITokenBody | undefined = await verifyToken(token);
            if(decoded == undefined) throw Error('Invalid token');
        
             /// i am using redis to store user details for overcomming the database query

            let user = await redisClient.get(token);
            if(user != null){
                req.user = JSON.parse(user);
            }else {
                let users: IUser[] = await getUser({_id:decoded._id, token: token}, 1, 0);
                if(users.length == 0) throw Error('User not found with this token');
                await redisClient.set(token, JSON.stringify(users[0]), 'EX', 60 * 5);
                req.user = users[0];
            }
            if(refreshRedis) await redisClient.del(token);
            next();
        } catch (error) {
            res.status(400).json({message:error.message, status:'error'})
        }
    }
}


export const shearchQuery = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        try{
            let search = '';
            if(req.query.search != undefined) search = req.query.search.toString();

            let searchQuery: any = {
                $or: [
                    {title: {$regex: search, $options: 'i'}},
                    {cast: {$regex: search, $options: 'i'}},
                ]
            };

            req.limit = 15;
            req.skip = 0;

            if(req.query.limit != undefined) req.limit = parseInt(req.query.limit.toString());
            if(req.query.skip != undefined) req.skip = parseInt(req.query.skip.toString());

            if(req.query.filter != undefined) {
                searchQuery.type = req.query.filter.toString();
            }
            req.searchQuery = searchQuery;
            next();
        }catch(error){
            res.status(400).json({message:error.message, status:'error'})
        }
    }
}


export const checkrequiredQuery = (keys:string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let errorKeys: string[] = [];
        try {
            keys.forEach((e) => {
                if(req.query[e] == undefined) {
                    errorKeys.push(e);
                }
            });

            if(errorKeys.length > 0) throw Error(`Required query keys are missing: ${errorKeys.join(', ')}`)
            else next();
        } catch (error) {
            res.status(400).json({message:error.message, status:'error'})
        } 
    }
}