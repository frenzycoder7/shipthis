import { ObjectId } from "mongoose";

export interface IDatabaseOptions {
    url: string;
}

export interface IShow {
    show_id: string;
    type: string;
    title: string;
    director: string;
    cast: string;
    country: string;
    date_added: string;
    release_year: string;
    rating: string;
    duration: string;
    listed_in: string;
    description: string;
    createdAt: Date;
    updatedAt: Date; 
}


export interface IUser {
    _id: ObjectId
    email:string;
    password:string;
    age:number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    save():unknown;
    token:string
}

export interface ICreateUser {
    email:string;
    password:string;
    age:string;
    name:string;
}

export interface ITokenBody {
    _id: ObjectId;
    email:string;
    name:string;
    age:number;
}