import { redisClient } from "@connection";
import { ICreateUser, ITokenBody, IUser } from "@interfaces";
import { createUser, getUser, updateUser } from "@services";
import { comparePassword, generateToken, hashPassword } from "@utils";
import { Request, Response } from "express";

export const createUserLogic = async (req: Request, res: Response) => {
   try {
    let body: ICreateUser = req.body;
    body.password = await hashPassword(body.password);
    let user:IUser = await createUser(body);
    res.status(201).json({message:"User created successfully", user, status:"success"});
   } catch (error) {
    res.status(500).json({message:error.message, error, status:"error"}) 
   } 
}


export const loginUserLogic = async (req: Request, res: Response) => {
    try {
        let user: IUser[] = await getUser({$or:[{email:req.body.email}, {phone:req.body.email}]}, 1, 0);
        if(user.length == 0)  throw new Error('User not found with this email or phone');

        let isMatch = await comparePassword(req.body.password, user[0].password);
        if(!isMatch) throw new Error('Password is incorrect');
        await redisClient.del(user[0].token);
        let tokenBody: ITokenBody = {
            _id: user[0]._id,
            email: user[0].email,
            age: user[0].age, 
            name: user[0].name,
        } 

        let token: string = await generateToken(tokenBody);
        user = await updateUser({_id:user[0]._id}, {token}) as any;

        res.status(200).json({message:"User logged in successfully", user, token});
    } catch (error) {
        res.status(500).json({message:error.message, status:"error"})        
    }
}


export const validateUserLogic = async (req: Request, res: Response) => {
    res.status(200).json({message:"token is valid", user:req.user, status:"success"});
}