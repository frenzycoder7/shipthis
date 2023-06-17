import { ICreateUser, IUser } from "@interfaces";
import { USER_MODEL } from "@models";

export const createUser = async (data:ICreateUser): Promise<IUser> => {
    let user:IUser = await USER_MODEL.create(data);
    return user;
}

export const getUser = async (query: any, limit: number = 10, skip: number = 0): Promise<IUser[]> => {
    let users: IUser[] = await USER_MODEL.find(query).limit(limit).skip(skip);
    return users;
}

export const updateUser = async (query: any, data: any): Promise<IUser | null> => {
    let user: IUser | null = await USER_MODEL.findOneAndUpdate(query, data, {new:true});
    return user;
}