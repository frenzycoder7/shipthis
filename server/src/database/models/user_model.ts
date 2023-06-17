import { Model, Schema, model } from "mongoose";
import {IUser} from '@interfaces';
import { USER_MODEL_NAME } from "@modelnames";

export const user_structure = {
    email: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate: {
            validator: (email:string) => {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(email);
            },
            message: (props:any) => `${props.value} is not a valid email address!`
        },
    },
    age: {
        type:Number,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    name: {
        type:String,
        required:true,
    },
    token: {
        type:String,
    },
};


const userSchema:Schema<IUser> = new Schema<IUser>(user_structure,{timestamps:true});

export const USER_MODEL: Model<IUser> = model(USER_MODEL_NAME, userSchema);